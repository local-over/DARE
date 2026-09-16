#!/usr/bin/env node
// DARE v2 — CLI
const { convertFile } = require('./index');

const args = process.argv.slice(2);

// Help flag
if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(`
  ╔══════════════════════════════════════╗
  ║       DARE Engine v2.0 — CLI        ║
  ╚══════════════════════════════════════╝

  Usage:
    node cli.js <input.dare> <output.pdf> [options]

  Options:
    --help, -h     Show this help message
    --version, -v  Show version

  Examples:
    node cli.js document.dare output.pdf
`);
    process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
    const pkg = require('./package.json');
    console.log(`DARE Engine v${pkg.version}`);
    process.exit(0);
}

let dataPath = null;
const dataFlagIdx = args.indexOf('--data');
if (dataFlagIdx !== -1 && args.length > dataFlagIdx + 1) {
    dataPath = args[dataFlagIdx + 1];
    args.splice(dataFlagIdx, 2);
}

if (args.length < 2) {
    console.error('❌ Error: Please provide input and output paths.');
    console.error('   Usage: node cli.js <input.dare> <output.pdf> [--data data.json]');
    process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1];

console.log(`\n  ⚡ DARE Engine v2.0`);
console.log(`  ─────────────────────`);
console.log(`  📄 Input:  ${inputPath}`);
console.log(`  📦 Output: ${outputPath}\n`);

const startTime = Date.now();

convertFile(inputPath, outputPath, dataPath)
    .then(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`  ✅ Document generated in ${elapsed}s`);
        console.log(`  📂 Saved to: ${outputPath}\n`);
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

