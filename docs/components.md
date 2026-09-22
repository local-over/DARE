# DARE Components Reference

This document provides a comprehensive overview of all supported DARE components in v3.1, including containers, text elements, media, and shapes.

## Component Format
```dare
tag(attribute=value flag $variable) { content or children }
```

## Containers

Containers wrap other components and dictate their layout.

### `page`
Defines a new PDF page. Every document starts with at least one `page`.
- **Props**: `bg`, `p`, `px`, `py` (padding), `margin` modifiers.

### `box`
A versatile block container. Can be used for backgrounds, borders, or stacking content.
- **Props**: `bg`, `border`, `borderColor`, `p`, `px`, `py`, `mt`, `mb`, `ml`, `mr`, `w`, `h`, `unbreakable` (prevents page breaks inside the box).
- **Layout Flags**: `row` (horizontal layout), `col` (vertical layout), `gap` (spacing), `between`, `center`.

### `cols`
A specialized flex-like row container used to place elements side-by-side. 
- **Props**: `gap` (spacing between columns), `n` (number of equal-width columns), `between` (space-between layout).
- **Usage**: Automatically evenly distributes children or respects `w` property of children. `cols(n=3)` creates 3 equal columns.

### `each`
Loops over an array in the data context.
- **Usage**: `each(item in items) { txt { {{ item.name }} } }`

### `if`
Conditionally renders its content based on a truthy value in the data context.
- **Usage**: `if(showDetails) { txt { Details... } }`

## Leafs (Text Elements)

Elements designed for text rendering and formatting.

### `txt`
Standard text block.
- **Props**: `size` (or `fs`), `color`, `bold`, `italic`, `uppercase`, `ta` (text-align), `lh` (line-height).

### `tbl`
Creates a table. Data is provided as semicolon-separated rows, with comma-separated cells.
- **Props**: `cols` (e.g., `cols="2fr 1fr"` for column widths), `unbreakable`.
- **Usage**: 
  ```dare
  tbl(cols="1fr 1fr") { 
    Header1, Header2; 
    Row1Col1, Row1Col2;
  }
  ```

### `badge`
A small inline badge with a background color.
- **Props**: `bg`, `color`, `size`.

### `link`
A hyperlinked text element.
- **Props**: `url`, `color`, `size`.

## Media Elements (Voids)

Elements for rendering images, charts, and codes (No children).

### `img`
Renders an image from a URL or local file path.
- **Props**: `src`, `w`, `h`, `center`, `right`, `left`.

### `bar`, `pie`, `line`
Renders charts natively.
- **Props**: `labels="Jan,Feb,Mar"`, `data="10,20,30"`, `w`, `h`, `title`, `color`, `bg`.

### `qr`
Generates a QR code.
- **Props**: `data`, `w`, `h`, `align` (center/left/right).

## Shapes & Dividers

### `shape`
Draws a geometric shape.
- **Props**: `type` (`rect`, `circle`), `w`, `h`, `bg`, `color`, `border`.

### `hr` / `line`
Draws a horizontal rule/line.
- **Props**: `h` (thickness), `color`, `mt`, `mb`.

### `sp`
Spacer element to add vertical space.
- **Props**: `h` (height).
