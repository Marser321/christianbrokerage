# UI SPEC - Christian Brokerage Editorial Humano

## Direction
Editorial Humano: fotografia real, autoridad local, superficies sobrias y copy escaneable. La web debe sentirse como una oficina seria de Washington Heights, no como una demo de efectos visuales.

## Tokens
- Ink navy: `#071827`
- Deep navy: `#0d2a44`
- Blue brand: `#1f5c9a`
- Gold: `#b9913f`
- Gold soft: `#dfc47a`
- Paper: `#f7f3ea`
- Warm white: `#fffaf0`
- Slate text: `#334155`
- Border: `rgba(7, 24, 39, 0.12)`

## Typography
- Display: Fraunces, Georgia, serif.
- Body: Public Sans, system-ui, sans-serif.
- Headings: line-height 1.04-1.12.
- Body: line-height 1.6.
- Eyebrows: uppercase, 0.16em letter spacing max.

## Layout
- Sections use full-width bands, not floating section cards.
- Cards use radius 12-18px, restrained borders and no nested card stacks.
- Service pages use alternating paper/navy editorial bands.
- Visuals prefer real portrait/office/certification photography.

## Motion
- Entrance motion: opacity + y 16-24px, 0.45-0.65s.
- No infinite floating 3D objects.
- Respect `prefers-reduced-motion`.
- Hover states are tactile but quiet: border, color, translateY <= 2px.

## Accessibility
- Drawer must use `role="dialog"`, `aria-modal`, title binding, Escape close.
- Visible focus rings on all interactive controls.
- Form/calendar fallbacks avoid code-path instructions for visitors.
- Images have descriptive alt unless decorative.
