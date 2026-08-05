# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Selected direction

- The user selected the third generated direction on 2026-07-15.
- The implementation source of truth is the user's seven polished Figma frames in file `KpbkqjxFlRB3LCGSwJhXMU`: queue (`6005:2556`), evidence review (`6037:12225`), audit trail (`6144:4478`), extracted details (`6144:3581`), policy decision (`6092:2034`), clarification (`6134:2437`), and final decision (`6155:9841`).
- Implement the Figma frames in code only. Treat the Figma file as read-only unless the user explicitly requests Figma edits.
- Reuse a single shared review shell and the Figma-aligned button system, including the skeuomorphic neutral controls and the green/red Fancy Button decision variants.
- Preserve the evidence-first layout and three-step review progress, but use the polished light 62px rail, compact table density, white working surfaces, #EBEBEB borders, #335CFF interaction color, semantic status pills, and minimal elevation.
- The queue should show risk as a filter/input to prioritization, not as a permanent table column. Keep AI review and claim status as icon-supported pills.
- Treat the Figma file as a read-only visual reference for code implementation unless the user explicitly asks for Figma edits.
- Use the assignment's canonical 8–12 May 2026 trip dates even where the generated concept image rendered different dates.
- Serve receipt images with AVIF as the preferred format and PNG as a fallback; the evidence canvas must never appear blank while a receipt loads.
- Treat the claim as the decision object and the claimant as context: combine claimant and claim in one header identity block, with prior claims available only on demand.
- Use the bundled Certia family as the primary interface typeface across headings, body copy, controls, and labels. Keep Geist Mono only for financial values and identifiers.
- Use the bundled Cloister Black typeface for every person/claimant initial rendered inside an avatar, including the queue, claim header, comparison chips, and audit trail.
- Keep primary operational body copy at 14 px and supporting copy at 12 px or larger; reserve 10 px only for compact confidence, progress, and comparison metadata that matches the Figma source.
- For extracted details, node `6144:4474` is the exact component source: 16 px Certia Bold title, 14/16 px Certia Regular rows, 30 px icon fields with 16 px exported icons, 14 px column gaps, 151 px label column, and 46 px row pitch.
- Use the exported `detail-*` SVGs from `public/figma/icons/` for extracted-detail fields; do not substitute the smaller signal icons used in finding cards.
- The user now wants a fully responsive mobile experience while preserving the existing desktop UI exactly. Keep the 1280–1600 px Figma composition as the desktop source of truth, implement mobile behavior only inside sub-841 px responsive layers, and never alter desktop selectors to solve narrow-screen layout issues.
- Every claim row in the verification queue is a prototype entry point and must open the representative review flow, rather than limiting navigation to one named claimant.
- Keep all four expense rows interactive. Each selection must update the evidence document, extracted details, amount/date/status, and review condition: hotel—possible duplicate; taxi—verified; meal—policy exception; flight—verified.
- Extend the polished flow only with genuinely missing states from the earlier prototype. Existing Figma-backed queue, evidence, details, audit, policy, comparison, and approval states must remain the source components rather than being recreated.
- The missing desktop flow states are Request Clarification, Clarification Sent, Final Decision Review, and Reject Claim. They reuse the current Certia typography, Figma/Hugeicons assets, semantic colors, and AlignUI Fancy Buttons.
- Request Clarification is a modal over the active review workspace, not a standalone page. Clarification reasons and requested supporting documents are compact multi-select dropdowns inside that modal.
- Final Decision Review is a compact 780 px clarification-style modal over the active evidence workspace, not a standalone page. Its header contains only “Review the final reimbursement,” the assessment subtitle, and close control—never the review-progress component or “Ready for your decision” eyebrow. Review results come first; reimbursement appears beneath them with Submitted and Excluded in two equal columns, followed by the final reimbursement, notification, acknowledgement, and footer actions.
- Figma node `6144:4748` remains the source for the review footer geometry: three equal-width 40 px buttons with 15 px gaps. The newer explicit AlignUI request supersedes that node's old red/green button paint.
- Figma node `6144:4501` is the exact source for the claim navigation controls: a fixed 115 × 26 px group, 29 px gap between Back and the pagination pair, 8 px between pagination buttons, 26 px button shells, and 14 px Huge Icons. Use `ArrowLeft02Icon` and `SquareArrowDown01Icon` from Huge Icons; rotate the first square-arrow glyph 180° for Previous.
- Never vertically flip the hotel/bed glyph. Use the upright `BedDoubleIcon` from Huge Icons consistently in expense rows, matching-signal lists, extracted details, and evidence comparison. Missing non-hotel detail states should use their own Huge Icons rather than reusing the hotel glyph.
- Figma node `6144:4677` is the exact source for the review progress component: fixed 354 × 51 px geometry, three 79 × 51 px step frames at x `0`, `137.5`, and `275`, 28 px icon fields, 8 px icon-to-label gaps, and 10/15 px Certia labels. Use only the five downloaded Figma SVG assets for the three glyphs and two connectors; never replace them with PNGs or CSS-drawn line substitutions.
- Keep paired identity chips in the evidence-comparison facts panel on one shared baseline. Names must remain fully visible without wrapping, clipping, or ellipsis across the supported 1280–1600 px desktop widths.
- All standalone action CTAs must use the official AlignUI v1.2 namespace component from `@/components/ui/fancy-button` (`FancyButton.Root` and `FancyButton.Icon`). Preserve AlignUI's Radix Slot composition, neutral/primary/destructive/basic variants, three sizes, filled highlight layers, focus and disabled states. Resting buttons must not have a white outer border, inset/depressed shadow, or translated Y position. The green approval treatment is the sole product-specific `success` extension and uses AlignUI's official success token `#1FC16B` with the same AlignUI shadow anatomy.
- Keep every AlignUI Fancy Button label at 12 px with a 16 px line height. Preserve AlignUI's official 40/36/32 px medium, small, and xsmall heights so CTAs remain compact rather than visually oversized.
- Use AlignUI v1.2 as the source of truth for small form and interaction primitives: Checkbox, Radio, Input, Textarea, Select, and Dropdown. Keep product-specific layouts and structural controls custom, but do not redraw these micro-controls ad hoc inside feature components.
- Do not force structural controls—tabs, table rows, expense rows, compact icon navigation, document tools, or link-style rows—into Fancy Buttons. They remain semantically and visually distinct controls.
