# DARE Engine Documentation

Welcome to the official documentation for the **DARE Engine**, an AI-native, token-efficient markup language explicitly designed for generating pixel-perfect PDF documents. 

## Deep Introduction

DARE (Document Assembly and Rendering Engine) was born out of the need to bridge the gap between AI generation and precise document rendering. Traditional tools like HTML/CSS or LaTeX are often too verbose, unpredictable, or difficult for AI models to reliably construct into perfect PDFs without running into token limits or layout hallucinations. 

DARE introduces a minimalistic, token-efficient syntax that Large Language Models (LLMs) can easily write, paired with a robust rendering engine built on top of `pdfmake`. The engine compiles DARE markup directly into high-quality PDFs, ensuring that the visual output matches the AI's structural intent.

## Why DARE?

- **Token-Efficient**: Minimalist syntax heavily reduces the token footprint, making it cheaper and faster for AI to generate complex documents.
- **AI-Native**: Designed specifically for LLMs. The syntax avoids deeply nested tags or complex layout calculations, which often trip up models.
- **Pixel-Perfect PDF Rendering**: 100% native PDF generation. What you declare is exactly what gets rendered. No HTML intermediary, ensuring consistent styling.
- **Data Binding**: Built-in support for injecting external JSON data directly into the document using `{{}}`.
- **Developer Friendly**: Easily embeddable as a Node.js library, a CLI tool, or a REST API.

## Anatomy of a DARE File

A standard DARE file is divided into three distinct sections, separated by `@` decorators. This separation of concerns allows for clean, readable, and maintainable documents.

### 1. `@setup`
The `@setup` block defines global document settings and styling parameters. This includes page size, format, default fonts, and global style variables (starting with `$`).

```dare
@setup {
  format: 80mm 150mm;
  $brand: color=#000;
  $h1: size=16 bold;
}
```

### 2. `@data`
The `@data` block is used to declare inline JSON data or map external data variables. This is incredibly useful for templating, allowing you to reuse the same `.dare` file for different datasets.

```dare
@data {
  {
    "user": {
      "name": "Jane Doe",
      "role": "Software Engineer"
    },
    "company": "TechCorp"
  }
}
```

### 3. `@doc`
The `@doc` block is where the actual document content and structure are declared. It uses a token-efficient markup syntax to define layout elements like boxes, text blocks, images, tables, and loops, referencing the data defined in the `@data` block.

```dare
@doc {
  page {
    box(bg=#f8fafc, p=20) {
      txt($h1) { Invoice for {{user.name}} }
      txt(size=14) { Company: {{company}} }
      
      tbl(cols="2fr 1fr") {
        Item, Price;
        DARE Engine License, $0.00;
      }
    }
  }
}
```
