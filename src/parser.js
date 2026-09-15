// DARE v2 — Main Compiler (AST Generator)
// Parses DARE syntax into an Abstract Syntax Tree (JSON) for native renderers.

const { resolveAttributes, parseSetup, extractDataBlock, tokenize, extractDocBody, removeComments } = require('./tokenizer');
const QRCode = require('qrcode');
let fs = null;
let path = null;
try {
    fs = eval("require('fs')");
    path = eval("require('path')");
} catch (e) {
    // Running in Edge/Browser environment where fs is unavailable
}

// Component types mapping
const COMPONENT_TYPES = {
    // Containers (have children)
    page: 'container',
    box: 'container',
    cols: 'container',
    hdr: 'container',
    ftr: 'container',
    each: 'container',
    if: 'container',

    // Leafs (have raw text content)
    txt: 'leaf',
    tbl: 'leaf',
    list: 'leaf',
    badge: 'leaf',
    link: 'leaf',

    // Voids (no content or children)
    img: 'void',
    bar: 'void',
    pie: 'void',
    line: 'void',
    qr: 'void',
    hr: 'void',
    sp: 'void',
    shape: 'void'
};

function getComponentType(tag) {
    return COMPONENT_TYPES[tag] || 'container';
}

/**
 * Compile DARE source code into AST + format metadata.
 */
async function compile(sourceCode, cliContext = {}, basePath = '') {
    const cleanCode = removeComments(sourceCode);
    const { styleMap, paperFormat, orientation, fonts } = parseSetup(cleanCode);
    
    let docContext = { ...cliContext };
    const dataBlock = extractDataBlock(cleanCode);
    if (dataBlock) {
        if (dataBlock._linkedSrc) {
            try {
                if (fs && path) {
                    const dir = basePath ? path.dirname(basePath) : process.cwd();
                    const resolvedPath = path.resolve(dir, dataBlock._linkedSrc);
                    const dataStr = fs.readFileSync(resolvedPath, 'utf8');
                    Object.assign(docContext, JSON.parse(dataStr));
                }
            } catch(e) {
                console.warn(`DARE Warning: Failed to load linked data source ${dataBlock._linkedSrc}`);
            }
        } else {
            Object.assign(docContext, dataBlock);
        }
    }

    const docBody = extractDocBody(cleanCode);
    
    const ast = await parseBlock(docBody, styleMap, docContext);

    return {
        format: paperFormat,
        orientation: orientation,
        fonts: fonts,
        ast: ast
    };
}

/**
 * Fetch chart image from QuickChart API with retry.
 */
async function fetchChart(chartConfig, retries = 2) {
    // Use POST method to handle long configs
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch('https://quickchart.io/chart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chart: chartConfig,
                    width: 1000,
                    height: 500,
                    backgroundColor: 'white',
                    format: 'png'
                })
            });
            if (!res.ok) {
                console.warn(`QuickChart API returned ${res.status}: ${await res.text()}`);
                continue;
            }
            const arrayBuffer = await res.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            return `data:image/png;base64,${base64}`;
        } catch (e) {
            console.warn(`Chart fetch attempt ${attempt + 1} failed: ${e.message}`);
            if (attempt === retries) return '';
        }
    }
    return '';
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function interpolate(str, context) {
    if (!str) return str;
    return str.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path) => {
        const val = getNestedValue(context, path);
        return val !== undefined ? val : match;
    });
}

/**
 * Recursively parse a block of DARE code into an AST array.
 */
async function parseBlock(str, styleMap, context = {}) {
    const nodes = [];

    for (const token of tokenize(str)) {
        let { tag, attrStr, innerContent } = token;

        // Control Structures
        if (tag === 'each') {
            const parts = attrStr.split(' in ');
            if (parts.length === 2) {
                const loopVar = parts[0].trim();
                const listPath = parts[1].trim();
                const listData = getNestedValue(context, listPath) || [];
                
                for (const item of listData) {
                    const childContext = { ...context, [loopVar]: item };
                    const loopNodes = await parseBlock(innerContent, styleMap, childContext);
                    nodes.push(...loopNodes);
                }
            }
            continue;
        }

        if (tag === 'if') {
            const conditionPath = attrStr.trim();
            const isTruthy = !!getNestedValue(context, conditionPath);
            if (isTruthy) {
                const ifNodes = await parseBlock(innerContent, styleMap, context);
                nodes.push(...ifNodes);
            }
            continue;
        }

        // Interpolate data variables
        attrStr = interpolate(attrStr, context);
        innerContent = interpolate(innerContent, context);

        const props = resolveAttributes(attrStr, styleMap);
        const type = getComponentType(tag);

        const node = {
            tag,
            props
        };

        if (type === 'container') {
            node.children = await parseBlock(innerContent, styleMap, context);
        } else if (type === 'leaf') {
            node.content = innerContent;
        } else if (tag === 'qr') {
            try {
                node.qrData = await QRCode.toDataURL(props.data || 'DARE', { margin: 0, width: 500 });
            } catch (e) {
                node.qrData = '';
            }
        } else if (tag === 'img' && props.src) {
            try {
                if (props.src.startsWith('http')) {
                    const res = await fetch(props.src);
                    const arrayBuffer = await res.arrayBuffer();
                    const base64 = Buffer.from(arrayBuffer).toString('base64');
                    const contentType = res.headers.get('content-type') || 'image/png';
                    node.imgData = `data:${contentType};base64,${base64}`;
                } else if (fs && path) {
                    const ext = path.extname(props.src).substring(1);
                    const base64 = fs.readFileSync(props.src, { encoding: 'base64' });
                    node.imgData = `data:image/${ext || 'png'};base64,${base64}`;
                } else {
                    console.warn(`Local image loading not supported in this environment: ${props.src}`);
                    node.imgData = '';
                }
            } catch (e) {
                console.warn(`Failed to fetch image: ${props.src}`);
                node.imgData = '';
            }
        } else if (tag === 'bar' || tag === 'pie' || tag === 'line') {
            const labels = props.labels ? props.labels.split(',').map(s => s.trim()) : ['A', 'B', 'C'];
            const data = props.data ? props.data.split(',').map(Number) : [10, 20, 30];
            
            let chartType = tag;
            if (tag === 'line') chartType = 'line';
            
            const chartConfig = {
                type: chartType,
                data: {
                    labels: labels,
                    datasets: [{
                        label: props.label || props.title || 'Data',
                        data: data,
                        backgroundColor: tag === 'pie' 
                            ? ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF']
                            : (props.bg ? props.bg : 'rgba(54, 162, 235, 0.8)'),
                        borderColor: tag === 'line' ? '#36A2EB' : undefined,
                        fill: tag === 'line' ? false : undefined
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: tag === 'pie', position: 'bottom' }
                    },
                    scales: tag !== 'pie' ? {
                        y: { beginAtZero: true }
                    } : undefined
                }
            };
            
            // Support multiple datasets
            if (props.data2) {
                const data2 = props.data2.split(',').map(Number);
                chartConfig.data.datasets.push({
                    label: props.label2 || 'Series 2',
                    data: data2,
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: tag === 'line' ? '#FF6384' : undefined,
                    fill: tag === 'line' ? false : undefined
                });
            }
            
            node.imgData = await fetchChart(chartConfig);
        }

        nodes.push(node);
    }

    return nodes;
}

module.exports = { compile };
