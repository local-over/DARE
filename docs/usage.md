# DARE Engine Usage

The DARE Engine is highly flexible and can be integrated into your workflow in three primary ways: as a Command Line Interface (CLI), as a Node.js Library, or as a standalone REST API.

---

## 1. CLI Usage

The Command Line Interface is the easiest way to compile `.dare` files into PDFs directly from your terminal.

### Basic Compilation
You can run the engine using `npx` (if installed globally or via package scripts) or directly via Node:

```sh
# Using npx (if configured)
npx dare compile input.dare -o output.pdf

# Or directly using the CLI script
node cli.js input.dare output.pdf
```

### Passing JSON Data
DARE supports data binding. You can pass an external JSON file to populate variables within your `.dare` document using the `--data` flag.

```sh
node cli.js input.dare output.pdf --data data.json
```

**Options**:
- `--help, -h`: Show help message and usage examples.
- `--version, -v`: Show the current version of the DARE Engine.

---

## 2. Node.js Library

You can embed the DARE Engine directly into your Node.js applications to generate PDFs programmatically. The engine exposes two main functions: `convertFile` and `convertString`.

### Installation
Make sure to require the library in your project:

```javascript
const { convertFile, convertString } = require('dare-engine');
```

### `convertFile(inputPath, outputPath, dataPath)`
Reads a `.dare` file from disk and saves the resulting PDF.

```javascript
const path = require('path');
const { convertFile } = require('dare-engine');

async function generateInvoice() {
    const input = path.join(__dirname, 'invoice.dare');
    const output = path.join(__dirname, 'invoice.pdf');
    const data = path.join(__dirname, 'customer.json'); // Optional

    try {
        const resultPath = await convertFile(input, output, data);
        console.log(`PDF successfully generated at: ${resultPath}`);
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
    @setup
    page_size: A4
    @doc
    text[size: 20]: "Hello {{name}}!"
    `;

    const options = {
        data: { name: "World" }
    };

    try {
        const pdfBuffer = await convertString(code, options);
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

**Payload Format 1 (JSON)**:
Send a JSON payload containing the `code` and optional `data`.

```bash
curl -X POST http://localhost:3000/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "code": "@setup\npage_size: A4\n@doc\ntext: \"Hello {{name}}\"",
    "data": { "name": "API User" }
  }' \
  --output result.pdf
```

**Payload Format 2 (Plain Text)**:
Send the DARE code directly as raw text.

```bash
curl -X POST http://localhost:3000/api/render \
  -H "Content-Type: text/plain" \
  -d '@setup
page_size: A4
@doc
text: "Hello World"' \
  --output result.pdf
```

#### `POST /api/preview`
*(Legacy)* This endpoint previously returned an HTML preview. In DARE v2.0, this is deprecated as the engine is now 100% native PDF. It will return a `410 Gone` status indicating you should use `/api/render`.

#### `GET /health`
Returns a health check status to ensure the API is running.

### Deployment on Render.com

The DARE Engine is fully configured for deployment on [Render.com](https://render.com/). The repository includes a `render.yaml` configuration file for a one-click Web Service deployment.

**`render.yaml` spec:**
- Type: `web`
- Environment: `node`
- Build Command: `npm install`
- Start Command: `node server.js`
- Port: `10000` (Customizable via environment variables)
- Health Check: `/health`

Simply connect your repository to Render, and it will automatically deploy the API server using this configuration.
