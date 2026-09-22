---
name: dare-engine
description: A skill to write DARE code and generate PDFs via the live DARE API.
---

# DARE Language Skill File

DARE is a layout language for generating PDFs. This skill file documents the syntax, supported components, styling, data interpolation, and common mistakes to avoid.

## File Structure

A valid DARE file contains three main blocks: `@setup`, `@data` (optional), and `@doc`.

### 1. @setup Block
Defines page format, fonts, and style variables.
```dare
@setup {
    format: A4 portrait;  // Predefined or custom like "500 500"
    font: Helvetica, Arial;
    $title_style: size=24 bold center uppercase;
    $box_style: p=10 bg=#f8fafc border borderColor=#e2e8f0;
}
```

### 2. @data Block (Optional)
Embeds JSON data for interpolation.
```dare
@data {
    {
        "user": "Alice",
        "orders": [
            {"id": 1, "total": 100},
            {"id": 2, "total": 250}
        ],
        "showDetails": true
    }
}
```
Or link to an external JSON file:
```dare
@data {
    src: "data.json"
}
```

### 3. @doc Block
The main layout tree. Every DARE file **MUST** have a `@doc { ... }` block.
```dare
@doc {
    page(bg=white) {
        box(row gap=10 p=20) {
            txt($title_style color=primary) { Invoice for {{ user }} }
        }
    }
}
```

## Syntax & Components

### Component Format
```dare
tag(attribute=value flag $variable) { content or children }
```

### Supported Tags

#### Containers (Can hold children)
- `page`: A new PDF page.
- `box`: A versatile container. Use `row` flag for horizontal layout (`gap`, `n` columns). Supports padding (`p`, `pt`, `pb`, `pl`, `pr`), margins (`mt`, `mb`, `ml`, `mr`), `bg`, `border`, `borderColor`.
- `cols`: Column layout (`n` columns, `gap`).
- `each`: Loop over data (e.g., `each(item in orders) { ... }`).
- `if`: Conditional rendering (e.g., `if(showDetails) { ... }`).

#### Leafs (Raw text content)
- `txt`: Text component. Supports `size`, `color`, `uppercase`, `bold`, `italic`.

#### Voids (No children, self-closing implicitly)
- `img`: Image (supports `src`, `w`, `h`).
- `qr`: QR code generator (`data`, `w`, `h`).
- `bar`, `pie`, `line`: Charts (`data="10,20,30"`, `labels="A,B,C"`, `w`, `h`, `bg`, `title`).
- `hr` / `line`: Horizontal separator (`color`, `mt`, `mb`).
- `sp`: Vertical space (`h`).

## Styling Attributes
- **Dimensions/Spacing:** `p`, `pt`, `pb`, `pl`, `pr`, `m`, `mt`, `mb`, `ml`, `mr`, `w`, `h`, `size`, `gap` (Units: `px`, `mm`, or raw numbers).
- **Colors:** `color`, `bg`, `borderColor`. Accepts hex (`#ff0000`) or built-in palette (`white`, `black`, `primary`, `secondary`, `surface`, `border`, `muted`, `danger`, `success`).
- **Typography Flags:** `bold`, `italic`, `uppercase`.
- **Layout Flags:** `unbreakable` (prevents boxes or tables from splitting across pages).
- **Variables:** Defined in `@setup` starting with `$` and reused in attributes.

## Data Interpolation
Use double curly braces `{{ path.to.var }}` in text content or attributes to inject data.

## API Usage
If the local CLI is not available, agents can render DARE files via the online API.

**Endpoint:** `POST /api/render`
**Payload:**
```json
{
    "source": "<DARE code string>"
}
```

## Common Mistakes to Avoid
1. **Missing `@doc` block:** A fatal error. Every file must contain `@doc { ... }`.
2. **Invalid Data Block:** Ensure `@data { ... }` contains valid JSON.
3. **Unmatched Braces:** Pay attention to nested brackets.
4. **Unsupported Images:** Ensure local image paths are correct or use accessible URLs.

## Agent Feedback System (Diagnostics)

DARE Engine v3.1+ includes a built-in feedback tool to help AI Agents ensure their layout constraints are respected (such as preventing accidental page overflows for fixed formats like business cards, or warning about illegible text).

### How to use the Feedback Tool
When compiling locally, pass the `--feedback` flag to emit a JSON diagnostics log:
```bash
npx dare compile document.dare output.pdf --feedback
```
The CLI will output a `[DARE_FEEDBACK_LOG]` block:
```json
{
  "pagesExpected": 1,
  "pagesGenerated": 2,
  "warnings": [
    "Page overflow detected! Expected 1 logical page(s) based on tags, but generated 2 physical pages. Content is likely too large for the layout.",
    "Extremely small text (size < 6) detected. This may be illegible when printed."
  ]
}
```

### Self-Correction Protocol
As an AI Agent using DARE, if you encounter warnings in the feedback log, **you must handle the request yourself by actively editing the content**:
1. **Overflows:** If `pagesGenerated > pagesExpected` (e.g., a business card spilled over to page 2), the content or spacing is too large. **Fix it** by reducing padding (`p`), margins (`mt`, `mb`), font sizes (`size`), or vertical spaces (`sp(h=...)`).
2. **Small Text:** If warned about text size < 6, increase the font sizes to ensure legibility.
3. **Re-evaluate:** After modifying the `.dare` code, re-run the compile command with `--feedback` to verify your changes resolved the warnings.

## Full Example
```dare
@setup {
    format: A4;
    $heading: size=20 bold color=primary;
    $card: p=15 bg=surface border borderColor=border;
}
@data {
    {
        "title": "Monthly Report",
        "stats": [{"label": "Users", "val": 150}, {"label": "Sales", "val": 300}]
    }
}
@doc {
    page {
        box($card mt=20) {
            txt($heading uppercase) { {{ title }} }
            hr(mt=10 mb=10 color=muted)
            each(stat in stats) {
                box(row gap=5) {
                    txt(bold) { {{ stat.label }}: }
                    txt() { {{ stat.val }} }
                }
            }
            sp(h=20)
            bar(data="10,50,30" labels="Jan,Feb,Mar" w=400 h=200)
        }
    }
}
```
