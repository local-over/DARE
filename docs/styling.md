# DARE Styling Reference

This document covers all styling properties, shorthand mappings, typography, and layout flags supported by DARE.

## Shorthand CSS Mappings

DARE provides an extensive set of shorthand attributes for quick and token-efficient styling.

### Dimensions
- `w`: width
- `h`: height
- `minw`, `minh`: min-width, min-height
- `maxw`, `maxh`: max-width, max-height

### Padding & Margin
- `p`: padding (all sides)
- `pt`, `pb`, `pl`, `pr`: padding top, bottom, left, right
- `px`: padding horizontal (left/right)
- `py`: padding vertical (top/bottom)
- `m`: margin (all sides)
- `mt`, `mb`, `ml`, `mr`: margin top, bottom, left, right
- `mx`: margin horizontal
- `my`: margin vertical

### Colors & Backgrounds
- `bg`: background color
- `color`: text color
- `borderColor`: border color

### Borders
- `border`: border width/style
- `r` or `rounded`: border-radius

### Typography Shorthands
- `size` or `fs`: font-size (automatically mapped to `pt`)
- `font` or `ff`: font-family
- `line` or `lh`: line-height
- `ta`: text-align
- `td`: text-decoration
- `tt`: text-transform
- `ls`: letter-spacing
- `ws`: white-space
- `fw`: font-weight

## Typography Flags

Boolean flags can be used directly on elements to apply typography styles instantly:

- `bold`: Applies bold font-weight.
- `italic`: Applies italic font-style.
- `underline`: Applies underline text-decoration.
- `strikethrough`: Applies line-through text-decoration.
- `uppercase`: Transforms text to uppercase.
- `lowercase`: Transforms text to lowercase.
- `capitalize`: Capitalizes the first letter of each word.

## Layout Flags

These boolean flags control how elements are arranged and displayed:

- `center`: Centers the element or its text. For boxes, it centers the box in its parent.
- `left`, `right`: Aligns content or the container itself to the left or right.
- `row`: Forces a flex row layout (children side-by-side).
- `col`: Forces a flex column layout (stack).
- `between`: Applies `space-between` alignment for rows/columns.
- `around`: Applies `space-around` alignment.
- `evenly`: Applies `space-evenly` alignment.
- `wrap`, `nowrap`: Controls flex wrapping.
- `stretch`, `start`, `end`: Controls cross-axis alignment.
- `unbreakable` or `nobreak`: Prevents page breaks from occurring inside the component (highly useful for `box` and `tbl`).

## Unit Auto-Completion

By default, numeric values for dimensions (like `w="50"`) are automatically appended with `mm` in the CSS renderer, or accurately converted to points (`pt`) in the PDF renderer. Certain properties (like `opacity`, `z-index`, `line-height`, `flex`) are unitless.
