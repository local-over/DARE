#!/usr/bin/env node
const { convertFile } = require('./index');
const args = process.argv.slice(2);

// Check for correct usage
if (args.length < 2) {
    console.log("Usage: node cli.js <input.dare> <output.pdf>");
    process.exit(1); // Exit with error code
}

const inputPath = args[0];
const outputPath = args[1];

console.log(`Compiling DARE file: ${inputPath} to ${outputPath}`);

// Call the conversion function and ensure a clean exit
convertFile(inputPath, outputPath)
    .then(() => {
        console.log("✅ PDF generation complete!");
        process.exit(0); // Explicitly exit Node.js process on success
    })
    .catch((error) => {
        console.error("❌ PDF generation failed:", error.message);
        process.exit(1); // Exit with error code on failure
    });
