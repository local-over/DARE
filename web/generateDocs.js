const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const outFile = path.join(__dirname, 'src/docsContent.js');

const files = ['index.md', 'components.md', 'styling.md', 'usage.md'];

let outStr = '';
files.forEach(file => {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const varName = file.replace('.md', '');
    outStr += `export const ${varName}Doc = ${JSON.stringify(content)};\n\n`;
});

fs.writeFileSync(outFile, outStr);
console.log('Docs generated!');
