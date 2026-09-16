#!/usr/bin/env node
// DARE v2 — CLI
const { convertFile } = require('./index');
const { closeBrowser } = require('./src/renderer');

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
    node cli.js examples/ultimate.dare report.pdf
`);
    process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
    const pkg = require('./package.json');
    console.log(`DARE Engine v${pkg.version}`);
    process.exit(0);
}

if (args.length < 2) {
    console.error('❌ Error: Please provide input and output paths.');
    console.error('   Usage: node cli.js <input.dare> <output.pdf>');
    process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1];

console.log(`\n  ⚡ DARE Engine v2.0`);
console.log(`  ─────────────────────`);
console.log(`  📄 Input:  ${inputPath}`);
console.log(`  📦 Output: ${outputPath}\n`);

const startTime = Date.now();

convertFile(inputPath, outputPath)
    .then(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`  ✅ PDF generated in ${elapsed}s`);
        console.log(`  📂 Saved to: ${outputPath}\n`);
        return closeBrowser();
    })
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(`\n  ❌ Compilation failed:`);
        console.error(`     ${error.message}\n`);
        closeBrowser().then(() => process.exit(1));
    });
