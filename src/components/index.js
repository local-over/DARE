// DARE v2 — Component Registry
// Pluggable architecture: add new components by adding a file and registering here

const renderPage = require('./page');
const renderBox = require('./box');
const renderTxt = require('./txt');
const renderImg = require('./img');
const renderQr = require('./qr');
const renderBar = require('./bar');
const renderPie = require('./pie');
const renderTbl = require('./tbl');
const renderList = require('./list');
const renderLine = require('./line');
const renderSp = require('./sp');
const renderBadge = require('./badge');
const renderLink = require('./link');
const renderCols = require('./cols');
const renderHdr = require('./hdr');
const renderFtr = require('./ftr');

/**
 * Component type classification:
 * - 'container': Has children that need recursive parsing (page, box, cols, hdr, ftr)
 * - 'leaf':      Content is raw text, NOT parsed recursively (txt, tbl, list)
 * - 'void':      No meaningful inner content (img, qr, hr, sp)
 * - 'async':     Requires await (qr)
 */
const COMPONENTS = {
    // Containers (children are parsed recursively)
    page: { render: renderPage, type: 'container' },
    box: { render: renderBox, type: 'container' },
    cols: { render: renderCols, type: 'container' },
    hdr: { render: renderHdr, type: 'container' },
    ftr: { render: renderFtr, type: 'container' },

    // Leaf nodes (inner content is text, not parsed)
    txt: { render: renderTxt, type: 'leaf' },
    tbl: { render: renderTbl, type: 'leaf' },
    list: { render: renderList, type: 'leaf' },
    badge: { render: renderBadge, type: 'leaf' },
    link: { render: renderLink, type: 'leaf' },

    // Void nodes (no meaningful children)
    img: { render: renderImg, type: 'void' },
    bar: { render: renderBar, type: 'void' },
    pie: { render: renderPie, type: 'void' },
    qr: { render: renderQr, type: 'void', async: true },

    // Aliases
    hr: { render: renderLine, type: 'void' },
    line: { render: renderLine, type: 'void' },
    sp: { render: renderSp, type: 'void' },
};

/**
 * Look up a component by tag name.
 * Unknown tags default to 'box' (container) behavior.
 */
function getComponent(tag) {
    return COMPONENTS[tag] || { render: renderBox, type: 'container' };
}

/**
 * Get the list of all registered component names.
 */
function listComponents() {
    return Object.keys(COMPONENTS);
}

module.exports = { COMPONENTS, getComponent, listComponents };
