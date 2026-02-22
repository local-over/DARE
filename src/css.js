// DARE v2 — CSS Engine
// Expanded shorthand map for maximum AI token efficiency

const CSS_MAP = {
    // Dimensions
    w: 'width', h: 'height',
    minw: 'min-width', minh: 'min-height',
    maxw: 'max-width', maxh: 'max-height',

    // Background & Color
    bg: 'background',

    // Padding
    p: 'padding',
    pt: 'padding-top', pb: 'padding-bottom',
    pl: 'padding-left', pr: 'padding-right',

    // Margin
    m: 'margin',
    mt: 'margin-top', mb: 'margin-bottom',
    ml: 'margin-left', mr: 'margin-right',

    // Border & Radius
    rounded: 'border-radius',
    r: 'border-radius',
    border: 'border',

    // Flexbox
    display: 'display',
    flex: 'flex',
    align: 'align-items',
    justify: 'justify-content',
    gap: 'gap',
    wrap: 'flex-wrap',

    // Grid
    cols: 'grid-template-columns',
    rows: 'grid-template-rows',

    // Positioning
    pos: 'position',
    top: 'top', bottom: 'bottom',
    left: 'left', right: 'right',
    z: 'z-index',

    // Typography
    lh: 'line-height',
    ta: 'text-align',
    td: 'text-decoration',
    tt: 'text-transform',
    ls: 'letter-spacing',
    ws: 'white-space',
    fw: 'font-weight',

    // Visual
    opacity: 'opacity',
    shadow: 'box-shadow',
    ow: 'overflow',
    ox: 'overflow-x',
    oy: 'overflow-y',

    // Misc
    cursor: 'cursor',
    transition: 'transition',
};

// Boolean flags — each maps to an array of [property, value] pairs
// Using structured format so later flags properly OVERRIDE earlier ones
const FLAG_MAP = {
    bold: [['font-weight', 'bold']],
    italic: [['font-style', 'italic']],
    underline: [['text-decoration', 'underline']],
    strikethrough: [['text-decoration', 'line-through']],
    uppercase: [['text-transform', 'uppercase']],
    lowercase: [['text-transform', 'lowercase']],
    capitalize: [['text-transform', 'capitalize']],
    center: [['display', 'flex'], ['align-items', 'center'], ['justify-content', 'center']],
    row: [['display', 'flex'], ['flex-direction', 'row']],
    col: [['display', 'flex'], ['flex-direction', 'column']],
    wrap: [['flex-wrap', 'wrap']],
    nowrap: [['flex-wrap', 'nowrap']],
    relative: [['position', 'relative']],
    absolute: [['position', 'absolute']],
    fixed: [['position', 'fixed']],
    hidden: [['overflow', 'hidden']],
    grid: [['display', 'grid']],
    inline: [['display', 'inline']],
    block: [['display', 'block']],
    between: [['display', 'flex'], ['justify-content', 'space-between']],
    around: [['display', 'flex'], ['justify-content', 'space-around']],
    evenly: [['display', 'flex'], ['justify-content', 'space-evenly']],
    stretch: [['align-items', 'stretch']],
    start: [['align-items', 'flex-start']],
    end: [['align-items', 'flex-end']],
    nobreak: [['page-break-inside', 'avoid']],
};

// Properties that should NOT get automatic 'mm' units
const UNITLESS = new Set([
    'flex', 'opacity', 'z-index', 'line-height', 'font-weight',
    'flex-grow', 'flex-shrink', 'order',
]);

// Properties that are not CSS (component-specific data)
const SKIP_CSS = new Set([
    'data', 'src', 'format', 'type', 'items', 'bullet', 'href', 'thick', 'n',
]);

/**
 * Generate CSS string from a DARE props object.
 * Uses a Map so later declarations properly override earlier ones.
 * e.g. `row, center, between` → between's justify-content wins.
 */
function generateCSS(props) {
    // Use a Map to collect CSS declarations — last write wins
    const declarations = new Map();

    for (const [k, v] of Object.entries(props)) {
        // Skip component-specific props
        if (SKIP_CSS.has(k)) continue;

        // Handle boolean flags
        if (v === true) {
            const flag = FLAG_MAP[k];
            if (flag) {
                for (const [prop, val] of flag) {
                    declarations.set(prop, val);
                }
            }
            continue;
        }

        // Handle color
        if (k === 'color') {
            declarations.set('color', v);
            continue;
        }

        // Handle font shortcuts
        if (k === 'size' || k === 'fs') {
            declarations.set('font-size', v + 'pt');
            continue;
        }
        if (k === 'font' || k === 'ff') {
            declarations.set('font-family', v + ', sans-serif');
            continue;
        }
        if (k === 'line') {
            declarations.set('line-height', v);
            continue;
        }

        // Handle padding/margin shorthands (px, py, mx, my)
        if (k === 'px') {
            declarations.set('padding-left', autoUnit(v));
            declarations.set('padding-right', autoUnit(v));
            continue;
        }
        if (k === 'py') {
            declarations.set('padding-top', autoUnit(v));
            declarations.set('padding-bottom', autoUnit(v));
            continue;
        }
        if (k === 'mx') {
            declarations.set('margin-left', autoUnit(v));
            declarations.set('margin-right', autoUnit(v));
            continue;
        }
        if (k === 'my') {
            declarations.set('margin-top', autoUnit(v));
            declarations.set('margin-bottom', autoUnit(v));
            continue;
        }

        // Standard CSS mapping
        const cssProp = CSS_MAP[k];
        if (cssProp) {
            declarations.set(cssProp, autoUnit(v, cssProp));
        } else {
            // Pass-through: treat key as raw CSS property
            declarations.set(k, autoUnit(v, k));
        }
    }

    // Build CSS string from deduplicated declarations
    const parts = [];
    for (const [prop, val] of declarations) {
        parts.push(`${prop}:${val}`);
    }
    return parts.join(';') + (parts.length ? ';' : '');
}

/**
 * Auto-add 'mm' to bare numbers (unless unitless property)
 */
function autoUnit(value, prop = '') {
    if (UNITLESS.has(prop)) return value;
    return /^\d+(\.\d+)?$/.test(value) ? value + 'mm' : value;
}

module.exports = { generateCSS, CSS_MAP, FLAG_MAP, SKIP_CSS };
