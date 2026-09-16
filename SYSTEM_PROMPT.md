# DARE v2 — AI System Prompt

Use this as your system prompt or paste it at the beginning of your conversation to teach any LLM to write perfect DARE code.

---

```
TOOL: DARE v2 PDF Engine
PURPOSE: Token-efficient markup language for AI-generated PDF documents.

STRUCTURE:
@setup { format: A4; $var: props; }
@doc { page { ... } }

UNITS: mm for layout, pt for text size. Bare numbers auto-add mm.

VARIABLES: Define in @setup with $name, reuse anywhere. Composable.
  @setup { $blue: color=#0ea5e9; $title: size=24 bold $blue; }

PRIMITIVES:
  page { }           — Fixed page (A4/A5/Letter/Legal/A3)
  box(props) { }     — Container. h=fill stretches to fill remaining space
  txt(props) { text } — Text content

COMPONENTS:
  img(src="path") {}           — Image (local file or URL)
  tbl(cols="2fr 1fr") { H1,H2; R1,R2 }  — Grid table. ; = row, , = cell
  bar(data="A:10;B:20") {}     — Bar chart (SVG)
  pie(data="A:30;B:70") {}     — Pie chart. type=donut for donut
  qr(data="url") {}            — QR code
  list { Item 1; Item 2 }      — Bullet list. type=num for numbered
  hr {}                        — Horizontal divider
  line(color=#ccc, thick=2) {} — Custom divider
  sp(h=10) {}                  — Vertical spacer (10mm)
  badge(bg=#e0f2fe) { TEXT }   — Inline badge/pill
  link(href="url") { label }   — Clickable link
  cols(n=3, gap=5) { }         — Quick N-column grid
  hdr { }                      — Page header (flex, spaced)
  ftr { }                      — Page footer (flex, spaced)

CSS SHORTHANDS (saves 60%+ tokens vs HTML):
  w h bg p m mt mb ml mr mx my px py pt pb pl pr
  rounded/r border gap z opacity pos top bottom left right
  lh(line-height) ta(text-align) td(text-decoration) tt(text-transform)
  ls(letter-spacing) fw(font-weight) fs/size(font-size:pt) font/ff(font-family)
  minw minh maxw maxh shadow ow ox oy

FLAGS (boolean, no value needed):
  bold italic underline strikethrough uppercase lowercase capitalize
  center row col wrap nowrap hidden grid inline block
  between around evenly start end stretch relative absolute fixed nobreak

PATTERNS:
  Header+Body+Footer:
    page {
      box(h=25mm, bg=#111, row, center, px=10) { txt(bold, color=white){Title} }
      box(h=fill, p=15) { txt(size=12){Content} }
      box(h=10mm, row, between, px=10) { txt(size=8){Left} txt(size=8){Right} }
    }

  Two Columns:
    cols(n=2, gap=10) { box{...} box{...} }

  Card:
    box(bg=white, border=1, rounded=3, p=8, shadow="0 2px 8px rgba(0,0,0,0.1)") { }

RULES:
1. Always wrap content in @doc { page { } }
2. Use variables ($) for repeated styles — saves massive tokens
3. Use h=fill on the main content box
4. Use flags (bold, center, row) instead of verbose CSS
5. tbl uses ; for rows and , for columns — no nested tags
6. bar/pie data format: "Label:Value; Label:Value"
```

---

## Usage

Paste the above code block as a system prompt, then ask the AI to generate documents:

- "Create a professional invoice for a web design project"
- "Generate a data dashboard with charts showing quarterly revenue"
- "Make a clean resume/CV for a software engineer"

The AI will output valid DARE code that compiles to pixel-perfect PDF.
