# DARE Engine Documentation

Welcome to the official documentation for the **DARE Engine**, an AI-native, token-efficient markup language explicitly designed for generating pixel-perfect PDF documents. 

## Deep Introduction

DARE (Document Assembly and Rendering Engine) was born out of the need to bridge the gap between AI generation and precise document rendering. Traditional tools like HTML/CSS or LaTeX are often too verbose, unpredictable, or difficult for AI models to reliably construct into perfect PDFs without running into token limits or layout hallucinations. 

DARE introduces a minimalistic, token-efficient syntax that Large Language Models (LLMs) can easily write, paired with a robust rendering engine built on top of `pdfmake`. The engine compiles DARE markup directly into high-quality PDFs, ensuring that the visual output matches the AI's structural intent.

## Why DARE?

- **Token-Efficient**: Minimalist syntax heavily reduces the token footprint, making it cheaper and faster for AI to generate complex documents.
- **AI-Native**: Designed specifically for LLMs. The syntax avoids deeply nested tags or complex layout calculations, which often trip up models.
- **Pixel-Perfect PDF Rendering**: 100% native PDF generation. What you declare is exactly what gets rendered. No HTML intermediary, ensuring consistent styling.
- **Data Binding**: Built-in support for injecting external JSON data directly into the document.
- **Developer Friendly**: Easily embeddable as a Node.js library, a CLI tool, or a REST API.

## Architecture

The DARE Engine architecture consists of three main stages:

1. **Parser**: The `src/parser.js` module reads the `.dare` file, resolves external data (if provided), and constructs an Abstract Syntax Tree (AST) representing the document's structure and styling.
2. **Compiler**: The AST is transformed into a robust internal schema compatible with the underlying PDF generation library.
3. **Renderer**: The `src/renderers/pdf.js` module takes the compiled schema and generates the final binary PDF output buffer.

## Anatomy of a DARE File

A standard DARE file is divided into three distinct sections, separated by `@` decorators. This separation of concerns allows for clean, readable, and maintainable documents.

### 1. `@setup`
The `@setup` block defines global document settings and styling parameters. This includes page size, margins, default fonts, and global color variables.

```dare
@setup
page_size: A4
margin: 40
font_family: Helvetica
primary_color: #FF5733
```

### 2. `@data`
The `@data` block is used to declare inline JSON data or map external data variables. This is incredibly useful for templating, allowing you to reuse the same `.dare` file for different datasets.

```dare
@data
{
  "user": {
    "name": "Jane Doe",
    "role": "Software Engineer"
  },
  "company": "TechCorp"
}
```

### 3. `@doc`
The `@doc` block is where the actual document content and structure are declared. It uses a token-efficient markup syntax to define layout elements like containers, text blocks, images, tables, and loops, referencing the data defined in the `@data` block.

```dare
@doc
container[width: 100%, background: primary_color]:
  text[size: 24, bold: true]: "Invoice for {{user.name}}"
  text[size: 14]: "Company: {{company}}"
  
  table[columns: 2]:
    row:
      cell: "Item"
      cell: "Price"
    row:
      cell: "DARE Engine License"
      cell: "$0.00"
```
