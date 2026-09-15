---
name: dare-engine
description: A strict skill to write DARE code and generate native PDFs via the live DARE Edge API.
---

# DARE Engine v3 - Agent Guidelines

The DARE Engine is a declarative, token-efficient markup language that compiles directly into native PDFs on the Cloudflare Edge. You MUST use this skill to generate PDFs for the user.

HTML is incredibly token-heavy and verbose. PDF generators like `pdfmake` require massive nested JSON structures. DARE solves this by providing a hyper-compact syntax.

## API Usage

Do not attempt to run `dare-engine` locally if you don't have it installed natively. Hit the Live API via HTTP POST instead:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "code": "@doc { page { txt { Hello {{ user.name }} } } }",
    "data": { "user": { "name": "Human" } }
}' https://dare.pages.dev/api/render --output generated.pdf
```
*(Note: The DARE API is fully stateless. It returns a PDF buffer instantly).*

## DARE Language Syntax

A DARE file consists of three primary root blocks: `@setup`, `@data`, and `@doc`.
Components use a function-like syntax: `componentName(properties) { children }`.

### 1. @setup Block
Define global configuration and styling aliases (variables) here.
```dare
@setup {
    format: a4; // REQUIRED: a4, letter, legal
    orientation: portrait; // portrait or landscape
    $h1: bold size=24 color=#000000 mb=10; // Style alias
    $card: bg=#f4f4f5 p=20 rounded=8 border=1 borderColor=#e4e4e7;
}
```

### 2. @data Block (Optional for API)
If testing locally or without API payloads, bind mock JSON data directly within the DARE code. In production, pass data dynamically via the HTTP JSON payload.
```dare
@data {
    "invoice": { "id": "104A", "total": 240.50 }
}
```

### 3. @doc Block
This is where the actual hierarchy goes.

#### Components
- **`page(properties)`**: Root element. Automatically handles page breaks.
- **`box(properties)`**: Container element (like `div`).
- **`cols(properties)`**: Grid layout. Set `n=X` for X equal columns. `gap` controls spacing.
- **`txt(properties)`**: Text node. Use `{{ var.name }}` syntax inside.
- **`img(properties)`**: Image. Requires `src`, `w`, `h`.
- **`qr(properties)`**: QR Code. Requires `data`, `w`.
- **`sp(properties)`**: Vertical spacer. Requires `h` (height).

#### Properties (Space-Separated, No Quotes)
Define inside component parens: `box(p=20 bg=#ff0000)`.
- **Spacing:** `p` (padding), `mt` (margin-top), `mb` (margin-bottom), `ml`, `mr`.
- **Dimensions:** `w` (width, e.g., `w=50%`), `h` (height).
- **Typography:** `size` (font size), `color` (hex or name), `bold`, `italic`, `center`, `right`.
- **Borders & Backgrounds:** `bg` (background color), `border` (border width), `borderColor` (hex), `rounded` (corner radius).

## Control Structures

You can use logic inside the `@doc` block!

**Loops (`each`)**
```dare
each(item in invoice.items) {
    box(border=1 mb=5 p=10) {
        cols(n=2) {
            txt { {{ item.name }} }
            txt(right) { ${{ item.price }} }
        }
    }
}
```

**Conditionals (`if` / `else`)**
```dare
if(invoice.isPaid) {
    txt(color=green bold) { INVOICE PAID }
} else {
    txt(color=red bold) { PAYMENT PENDING }
}
```

## Critical Agent Rules
1. **Valid Syntax**: You MUST write valid DARE syntax. Do not output HTML or raw JSON for documents.
2. **Variable Matching**: Ensure variables inside `{{ }}` match exactly the schema of the provided JSON payload.
3. **Save Tokens**: Use the `@setup` block to define primary colors and text styles to save tokens in the `@doc` block.
4. **No Quotes**: Never include quotes around property values (e.g., use `bg=#000000`, NOT `bg="#000000"`).
5. **Always Return File**: Always run the curl command to generate the PDF and return the saved `.pdf` file path to the user!
