# DARE Components Reference

This document provides a highly comprehensive overview of all supported DARE components, including containers, text elements, media, and shapes.

## Containers

Containers wrap other components and dictate their layout.

### `page`
Defines a page break or a specific page context. You can style the background of a page or its margins.
- **Props**: `bg`, `p`, `px`, `py` (for first page padding overrides).

### `box`
A versatile block container. Can be used for backgrounds, borders, or stacking content.
- **Props**: `bg`, `border`, `borderColor`, `p`, `px`, `py`, `w`, `h`, `unbreakable` (prevents page breaks inside the box).

### `cols`
A flex-like row container used to place elements side-by-side. 
- **Props**: `gap` (spacing between columns), `n` (number of equal-width columns), `between` (space-between layout), `w` (column widths).
- **Usage**: Automatically evenly distributes children or respects `w` property of children. `cols(n=3)` creates 3 equal columns.

### `hdr` & `ftr`
Page header and footer components. Can be placed inside a `page` for page-specific headers/footers, or at the root level for global headers/footers.

### `each`
Loops over an array in the data context.
- **Usage**: `each(item in items) { txt(item.name) }`

### `if`
Conditionally renders its content based on a truthy value in the data context.
- **Usage**: `if(showDetails) { txt("Details...") }`

## Text Elements

Elements designed for text rendering and formatting.

### `txt`
Standard text block.
- **Props**: `size` (or `fs`), `color`, `bold`, `italic`, `uppercase`, `ta` (text-align), `lh` (line-height).

### `tbl`
Creates a table. Data is provided as semicolon-separated rows, with comma-separated cells.
- **Props**: `cols` (e.g., `cols="2fr 1fr"` for column widths), `unbreakable`.
- **Usage**: `tbl(cols="1fr 1fr") { Header1, Header2; Row1Col1, Row1Col2 }`

### `list`
Creates an unordered or ordered list.
- **Props**: `type="ol"` or `type="ordered"` for numbered lists, `size`, `color`.

### `badge`
A small inline badge with a background color.
- **Props**: `bg`, `color`, `size`.

### `link`
A hyperlinked text element.
- **Props**: `url`, `color`, `size`.

## Media Elements

Elements for rendering images, charts, and codes.

### `img`
Renders an image from a URL or local file path.
- **Props**: `src`, `w`, `h`, `center`, `right`, `left`.

### `bar` & `pie` & `line`
Renders charts using the QuickChart API.
- **Props**: `labels` (comma-separated), `data` (comma-separated numbers), `data2`, `title`, `color`, `bg`.
- **Specifics**: `type="donut"` for pie charts.

### `qr`
Generates a QR code.
- **Props**: `data`, `w`, `h`, `center`.

## Shapes & Dividers

### `shape`
Draws a geometric shape.
- **Props**: `type` (`rect`, `triangle`, `circle`), `w`, `h`, `bg`, `color`, `border`.

### `hr` & `line`
Draws a horizontal rule/line.
- **Props**: `h` (thickness), `color`.

### `sp`
Spacer element to add vertical space.
- **Props**: `h` (height).
