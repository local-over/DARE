#!/usr/bin/env node
const { convertFile } = require('./index');
const pkg = require('./package.json');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const args = process.argv.slice(2);

// Help flag
if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(`
  ╔══════════════════════════════════════╗
  ║       DARE Engine v${pkg.version} — CLI        ║
  ╚══════════════════════════════════════╝

  Usage:
    node cli.js <input.dare> <output.pdf> [options]

  Options:
    --help, -h         Show this help message
    --version, -v      Show version
    --data <path>      Path to JSON data file
    --expect-pages <n> Fail if PDF does not match exact page count

  Examples:
    node cli.js document.dare output.pdf
    node cli.js document.dare output.pdf --expect-pages 1
`);
    process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
    console.log(`DARE Engine v${pkg.version}`);
    process.exit(0);
}

let dataPath = null;
const dataFlagIdx = args.indexOf('--data');
if (dataFlagIdx !== -1 && args.length > dataFlagIdx + 1) {
    dataPath = args[dataFlagIdx + 1];
    args.splice(dataFlagIdx, 2);
}

let expectPages = null;
const expectFlagIdx = args.indexOf('--expect-pages');
if (expectFlagIdx !== -1 && args.length > expectFlagIdx + 1) {
    expectPages = parseInt(args[expectFlagIdx + 1], 10);
    args.splice(expectFlagIdx, 2);
}

if (args.length < 2) {
    console.error('❌ Error: Please provide input and output paths.');
    console.error('   Usage: node cli.js <input.dare> <output.pdf> [--data data.json] [--feedback]');
    process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1];

let enableFeedback = false;
if (args.includes('--feedback')) {
    enableFeedback = true;
    const fbIdx = args.indexOf('--feedback');
    args.splice(fbIdx, 1);
}

console.log(`\n  ⚡ DARE Engine v${pkg.version}`);
console.log(`  ─────────────────────`);
console.log(`  📄 Input:  ${inputPath}`);
console.log(`  📦 Output: ${outputPath}`);
if (expectPages) console.log(`  📏 Expect: ${expectPages} pages\n`);
else console.log();

const startTime = Date.now();

// Recursive function to find small fonts
function findSmallFonts(nodes) {
    let smallFontsFound = false;
    if (!nodes) return false;
    for (const node of nodes) {
        if (node.tag === 'txt' && node.props && node.props.size) {
            let size = node.props.size.toString();
            if (!size.endsWith('mm') && !size.endsWith('px') && !size.endsWith('pt') && !size.endsWith('%')) {
                const s = parseFloat(size);
                if (!isNaN(s) && s < 6) smallFontsFound = true;
            }
        }
        if (node.children && findSmallFonts(node.children)) {
            smallFontsFound = true;
        }
    }
    return smallFontsFound;
}

convertFile(inputPath, outputPath, dataPath)
    .then(async ({ outputPath, astData }) => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`  ✅ Document generated in ${elapsed}s`);
        console.log(`  📂 Saved to: ${outputPath}`);
        
        let actualPages = 0;
        try {
            const dataBuffer = fs.readFileSync(outputPath);
            const data = await pdfParse(dataBuffer);
            actualPages = data.numpages;
        } catch (err) {
            console.error('\n  ❌ Error reading generated PDF:', err.message);
        }

        if (enableFeedback) {
            let expectedPages = 1;
            if (astData && astData.ast) {
                const pageTags = astData.ast.filter(n => n.tag === 'page');
                if (pageTags.length > 0) expectedPages = pageTags.length;
            }
            
            const warnings = [];
            if (actualPages > expectedPages) {
                warnings.push(`Page overflow detected! Expected ${expectedPages} logical page(s) based on tags, but generated ${actualPages} physical pages. Content is likely too large for the layout.`);
            } else if (actualPages < expectedPages && actualPages > 0) {
                warnings.push(`Page underflow detected! Expected ${expectedPages} logical pages, but only generated ${actualPages}.`);
            }
            
            if (astData && astData.ast && findSmallFonts(astData.ast)) {
                warnings.push(`Extremely small text (size < 6) detected. This may be illegible when printed.`);
            }

            const feedbackLog = {
                pagesExpected: expectedPages,
                pagesGenerated: actualPages,
                warnings: warnings
            };

            console.log(`\n  [DARE_FEEDBACK_LOG]`);
            console.log(`  ${JSON.stringify(feedbackLog, null, 2).replace(/\n/g, '\n  ')}`);
        }
        
        if (expectPages !== null) {
            if (actualPages !== expectPages) {
                console.error(`\n  ❌ Error: Expected ${expectPages} pages, but PDF has ${actualPages} pages.`);
                process.exit(1);
            } else {
                console.log(`  ✅ Page count validation passed: ${expectPages} pages.`);
                process.exit(0);
            }
        } else {
            process.exit(0);
        }
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

