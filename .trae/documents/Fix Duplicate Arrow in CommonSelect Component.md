I have identified the issue. The `CommonSelect` component has a "double arrow" problem because:

1.  **Legacy CSS**: The `.common-select__arrow` class in `common-select.scss` is still using the "border triangle hack" (setting `width: 0`, `height: 0`, and borders) to draw an arrow.
2.  **New SVG Icon**: The `common-select.tsx` file is now explicitly rendering a `<ChevronDown />` SVG icon inside that same span.

This results in both a CSS-drawn triangle and an SVG icon appearing simultaneously (or conflicting with each other).

### Plan to Fix
I will update `src/renderer/components/common-select/common-select.scss` to:
1.  Remove the `width: 0`, `height: 0`, and `border-*` properties from `.common-select__arrow`.
2.  Add flexbox centering and color styles to properly containerize the `<ChevronDown />` icon.

This will remove the "extra" CSS arrow and display only the clean SVG icon.