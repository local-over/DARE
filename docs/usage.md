# DARE Engine Usage

The DARE Engine v3.1 is highly flexible and can be integrated into your workflow in three primary ways: as a Command Line Interface (CLI), as a Node.js Library, or as a standalone REST API.

---

## 1. CLI Usage

The Command Line Interface is the easiest way to compile `.dare` files into PDFs directly from your terminal.

### Basic Compilation
You can run the engine using `npx` (if installed globally or via package scripts) or directly via Node:

```sh
# Using npx
npx dare compile input.dare output.pdf

# Or directly using the CLI script
node cli.js input.dare output.pdf
```

### Passing JSON Data
DARE supports data binding. You can pass an external JSON file to populate variables within your `.dare` document using the `--data` flag.

```sh
node cli.js input.dare output.pdf --data data.json
```

### Agent Feedback System (AI Self-Correction)
When compiling locally, pass the `--feedback` flag to emit a JSON diagnostics log containing layout constraints and warnings (e.g. page overflows, small text).

```sh
node cli.js input.dare output.pdf --feedback
```
The CLI will output a `[DARE_FEEDBACK_LOG]` block that AI Agents can parse to autonomously correct their layouts!

---

## 2. Node.js Library

You can embed the DARE Engine directly into your Node.js applications to generate PDFs programmatically. 

### Installation
Make sure to require the library in your project:

```javascript
const { convertFile, convertString } = require('dare-engine');
```

### `convertFile(inputPath, outputPath, options)`
Reads a `.dare` file from disk and saves the resulting PDF.

```javascript
const path = require('path');
const { convertFile } = require('dare-engine');

async function generateInvoice() {
    const input = path.join(__dirname, 'invoice.dare');
    const output = path.join(__dirname, 'invoice.pdf');

    try {
        const result = await convertFile(input, output, {
            data: { "customer": "John Doe" }
        });
        console.log(`PDF successfully generated at: ${output}`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

generateInvoice();
```

### `convertString(dareCode, options)`
Compiles a DARE markup string directly into a PDF buffer, useful for on-the-fly generation without touching the filesystem.

```javascript
const { convertString } = require('dare-engine');
const fs = require('fs').promises;

async function compileString() {
    const code = `
    @setup { format: A4; }
    @doc { page { txt { Hello {{name}}! } } }
    `;

    try {
        const pdfBuffer = await convertString(code, { data: { name: "World" } });
        await fs.writeFile('hello.pdf', pdfBuffer);
        console.log('PDF saved!');
    } catch (error) {
        console.error(error);
    }
}

compileString();
```

---

## 3. REST API

The DARE Engine includes an Express-based REST API for rendering documents over HTTP. This is ideal for microservice architectures or remote rendering.

### Starting the Server
Start the server locally using npm or by running the script directly:

```sh
npm start
# or
node server.js
```
The server will start on port `3000` (or `process.env.PORT`).

### Endpoints

#### `POST /api/render`
Generates a PDF from DARE code.

**Payload Format (JSON)**:
Send a JSON payload containing the `code` and optional `data`.

```bash
curl -X POST http://localhost:3000/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "code": "@setup { format: A4; } @doc { page { txt { Hello {{name}} } } }",
    "data": { "name": "API User" }
  }' \
  --output result.pdf
```
