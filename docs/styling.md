# DARE Styling Reference

This document covers all styling properties, shorthand mappings, typography, and layout flags supported by DARE v3.1.

## Shorthand Properties

DARE provides an extensive set of shorthand attributes for quick and token-efficient styling.

### Dimensions
- `w`: width
- `h`: height

### Padding & Margin
- `p`: padding (all sides)
- `pt`, `pb`, `pl`, `pr`: padding top, bottom, left, right
- `px`: padding horizontal (left/right)
- `py`: padding vertical (top/bottom)
- `mt`, `mb`, `ml`, `mr`: margin top, bottom, left, right

### Colors & Backgrounds
- `bg`: background color
- `color`: text color
- `borderColor`: border color

### Borders
- `border`: adds a border (e.g. `border=true`)
- `radius` or `r`: border-radius (e.g. `radius=5mm`)

### Typography Shorthands
- `size` or `fs`: font-size
- `font` or `ff`: font-family
- `lh`: line-height
- `ta`: text-align
- `ls`: letter-spacing

## Typography Flags

Boolean flags can be used directly on elements to apply typography styles instantly:

- `bold`: Applies bold font-weight.
- `italic`: Applies italic font-style.
- `uppercase`: Transforms text to uppercase.
- `lowercase`: Transforms text to lowercase.

## Layout Flags

These boolean flags control how elements are arranged and displayed:

- `center`: Centers the element or its text. 
- `left`, `right`: Aligns content to the left or right.
- `row`: Forces a flex row layout (children side-by-side) for boxes.
- `between`: Applies `space-between` alignment for rows/columns.
- `unbreakable`: Prevents page breaks from occurring inside the component (highly useful for `box` and `tbl`).

## Reusable Variables (`$`)

In DARE, you can define reusable styles in the `@setup` block and apply them effortlessly using the `$` prefix.

**Definition:**
```dare
@setup {
  $heading_style: size=24 bold uppercase color=#333;
  $card: bg=#f1f5f9 p=10mm radius=2mm;
}
```

**Usage:**
```dare
@doc {
  page {
    box($card) {
      txt($heading_style) { My Document }
    }
  }
}
```

## Unit Auto-Completion

By default, numeric values for dimensions (like `w=50`) are accurately converted to millimeters (`mm`) or points (`pt`) in the PDF renderer. You can also explicitly define units like `w=50%` or `w=20mm`.
