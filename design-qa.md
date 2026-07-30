# Figma Fidelity Audit — Verification Workspace

## Source of truth

- Figma file: `KpbkqjxFlRB3LCGSwJhXMU`
- Queue: `6005:2556`
- Evidence: `6037:12225`
- Extracted details: `6144:3581`
- Audit trail: `6144:4478`
- Policy decision: `6092:2034`
- Duplicate comparison: `6134:2437`
- Approved state: `6155:9841`

The exported references live in `figma-reference/`. Final same-size comparisons live in `qa/audit-final/`, with Figma on the left and the implementation on the right.

## Differences found and corrected

### Shared navigation and icons

- Replaced the generic rail glyphs with the SVGs exported from the Figma file.
- Rebuilt the 62 px rail, 32 px logo/controls, 35 px logo-to-navigation gap, 24 px navigation rhythm, active state, profile control, and hover tooltips.
- Replaced expense-category, finding-state, progress, metadata, extracted-field, comparison, policy-context, and modal-title glyphs with their Figma exports.
- Preserved Figma's transforms where an icon instance is rotated or mirrored.

### Queue

- Corrected the page heading, count summary, search field, filter controls, table origin, column proportions, 40 px table header, and 50 px body rows.
- Restored the exact avatar gradients, inline message badges, AI-review icons, status icons, monetary formatting, fills, borders, and pills.

### Evidence and receipt imagery

- Replaced placeholder/data imagery with the exported Riverside Grand Hotel invoice.
- Corrected the invoice from the previous undersized rendering to the Figma scale: approximately 568 px wide, centered with an 18 px canvas inset and an 80 px top offset.
- Matched the document title, extracted-data label, zoom toolbar, receipt shadow, and neutral canvas.

### Extracted details

- Corrected the three-column field grid and the spacing between icon, label, and value.
- Replaced glyph approximations with exported hotel, calendar, card, guest, room/invoice, and payment-reference icons.
- Rebuilt Maya and Jonas as actual gradient avatar fields inside the chips.

### Audit trail

- Corrected event spacing for ordinary events, attachments, quotes, and tags.
- Replaced the PDF approximation with the exported file shape plus the red PDF field.
- Corrected timeline geometry, avatar gradients, metadata hierarchy, quote treatment, tag fills, right-side finding cards, confidence gradients, and progress icons.

### Policy decision

- Corrected the modal to `539 px`, positioned `19 px` from the right and `22 px` from the top.
- Replaced the header, context, policy-file, and selected-radio assets with Figma exports.
- Matched the employee-context rhythm, amount comparison, policy callout wrapping, reviewer-decision rows, and 100 px action footer.

### Duplicate comparison

- Corrected the full-canvas overlay so it no longer shrinks to the browser pane.
- Replaced the modal title asset with the exact Figma export.
- Matched the two receipt surfaces, 52 px evidence headers, facts column, synchronized zoom control, and footer actions.

### Buttons

- Implemented the AlignUI Fancy Button v1.2 anatomy used by the Figma design.
- Matched AlignUI's resting surfaces, inner highlight, one-pixel color keyline, subtle drop shadow, 10 px radius, 40 px action height, and focus state.
- Removed the old white outer border, inset/depressed shadow, and translated active position that made the buttons appear permanently clicked.
- Corrected the approved-state primary action to the Figma 50 px height.

### Approved state

- Uses the exported success artwork and matching mint-to-white background.
- Corrected the modal, reimbursement summary, notification, and final Fancy Button dimensions.

### Typography

- Bundled the locally supplied Certia Regular, Medium, SemiBold, and Bold files and made Certia the primary typeface for headings, body copy, labels, inputs, and Fancy Buttons.
- Bundled Cloister Black and applied it consistently to claimant initials in the queue, active claim header, comparison chips, and audit trail.
- Kept Geist Mono only for financial values and identifiers.

## Verification

- All seven source states were captured at their Figma frame dimensions.
- Every final reference/implementation pair was compared in a single image.
- Queue → Evidence → Extracted details → Audit trail navigation was tested in the in-app browser.
- TypeScript and the production build pass.
- Browser console: no errors.

## Responsive audit

The Figma frames remain the source of truth at desktop size. Below `1200 px`, the same content and components reorganize without changing their visual language.

1. **Desktop, 1200 px and wider — Passed**
   - The original 62 px rail, compact queue table, three-column evidence workspace, Figma spacing, receipt scale, icons, status fields, and Fancy Buttons remain unchanged.
   - Rechecked at `1440 × 886`.

2. **Compact laptop and tablet, 841–1199 px — Passed**
   - The queue changes from a compressed table into a two-column claim-card grid.
   - The review workspace keeps expenses and evidence side by side, then places findings and decisions below the evidence surface.
   - The receipt remains legible and the findings panel is no longer cropped off-canvas.
   - Rechecked at `1024 × 768`.

3. **Tablet and mobile, 840 px and below — Passed**
   - Primary navigation becomes a fixed bottom bar.
   - Queue cards become a single-column list with clear amount, review, status, and submission-date placement.
   - The claim header, horizontal expense selector, evidence tabs, receipt viewer, findings, and decision controls stack in task order.
   - Rechecked at `768 × 1024` and `390 × 844`.

4. **Decision overlays — Passed**
   - Policy review becomes a full-height sheet with a persistent action footer.
   - Duplicate comparison stacks both receipts and facts vertically while preserving the final decision actions.
   - Approval confirmation becomes a bounded, scrollable modal with the full reimbursement summary visible.
   - Rechecked at `390 × 844`.

5. **Interaction and overflow — Passed**
   - Evidence, Extracted details, Audit trail, duplicate comparison, and approval were exercised at mobile width.
   - No body-level horizontal overflow was detected at `390`, `768`, or `1024` px. Horizontal scrolling is limited to the intentional expense selector and tab strip.

Responsive screenshots from this audit are stored in `qa/responsive/`.

## Remaining constraint

No known typography constraint remains. Certia and Cloister Black are now bundled with the prototype rather than relying on fonts installed on the viewing device.

**Result: passed for layout, assets, controls, imagery, typography, states, and interaction fidelity.**

## Extracted-details typography and icon audit

Source: Figma node `6144:4474`.

- Increased operational body copy across the review workspace so core labels, values, tabs, expense metadata, finding content, audit events, and overlay copy no longer read as miniature UI text.
- Matched the extracted-details title to 16 px Certia Bold and every detail row to 14 px Certia Regular with 16 px line height.
- Matched the Figma row geometry: 30 px icon field, 151 px label column, 14 px gaps, 30 px row height, and 46 px vertical pitch.
- Replaced the extracted-details substitutions with the exact hotel, calendar, card, user, scroll, and money SVG exports from Figma. All six assets load successfully.
- Preserved Cloister Black for the Maya and Jonas initial chips.
- Removed the desktop collision between long expense names and right-aligned amounts by reserving a fixed 128 px merchant column with ellipsis.
- Verified at `1567 × 964` and `390 × 844`; no body-level horizontal overflow was detected.
- Production typecheck/build passes. Final QA screenshots are stored in `qa/figma-6144-4474/`.

## Desktop flow extension and shell stabilization

- Recovered the earlier end-to-end flow from repository history and added only the missing states: Request Clarification, Clarification Sent, Final Decision Review, and Reject Claim.
- Reused the existing claim header, 62 px navigation rail, Certia/Cloister typography, exported Figma icons, semantic status colors, review progress, and AlignUI Fancy Buttons.
- Changed the desktop shell from route-specific artificial minimum heights to a viewport-bound layout. The page, rail, and review surface now remain exactly the viewport height; evidence, audit, scope, and decision content scroll within their own panels.
- Verified every route at `1280 × 800` and `1440 × 900`: queue, evidence, extracted details, audit trail, clarification, final decision, policy, comparison, approval, and rejection.
- At both desktop sizes, the page width equals the viewport width, the page height equals the viewport height, and the rail height equals the viewport height.
- The 1280 px final-decision layout was compacted for shorter desktop displays so the acknowledgement and all three decision actions remain visible without page-level scrolling.
- Interaction checks passed for sending a clarification request, enabling approval only after acknowledgement, opening the rejection dialog, and returning between states.
- Production typecheck/build passes. Current audit screenshots are stored in `qa/flow-extension/`.

## Queue and four-expense prototype interactions

- Made every row in the verification queue a working prototype entry point. Opening any claimant continues into the same representative review workflow and resets the selected expense to the hotel finding.
- Restored four distinct, clickable expense conditions from the earlier prototype:
  - Riverside Grand Hotel — possible duplicate, with hotel invoice and duplicate comparison.
  - CityCab — verified, with a distinct airport-transfer receipt and completed automated checks.
  - The Foundry Kitchen — policy exception, with a distinct dinner receipt and policy decision.
  - Lufthansa — verified, with a distinct e-ticket and completed automated checks.
- Every expense selection now updates the document title, document ID, receipt image, date, amount, status, extracted-detail fields, and right-side review card.
- AVIF remains the preferred receipt format with a PNG fallback. All four evidence images load successfully.
- Exercised queue navigation, all four expense selections, dynamic extracted details, the hotel duplicate comparison, and the meal policy decision in the in-app browser.
- Rechecked the interaction sequence at `1440 × 900`; the page remains exactly viewport-bound with no body-level horizontal or vertical overflow.
- Production typecheck/build passes. Interaction screenshots are stored in `qa/prototype-interactions/`.

## Clarification modal redesign

- Replaced the standalone clarification page with a centered modal over the active evidence-review workspace, preserving the reviewer’s claim context.
- Moved the claimant summary, AI-assisted message draft, response date, attachment action, and final request actions into the same modal.
- Converted Clarification reasons and Request supporting documents into functional multi-select dropdowns. Opening one closes the other, selected values remain checked, and the trigger reports the selected count.
- Kept the existing Certia/Cloister typography, exported Figma icons, and AlignUI Fancy Button system.
- Preserved the complete submission flow as a modal confirmation state with View claim and Return to queue actions.
- Verified at `1280 × 720` and `1440 × 900`; the modal, backdrop, workspace, and page remain viewport-bound without body overflow.
- Browser checks passed for both dropdowns, selecting an additional supporting document, closing dropdowns, sending the request, and rendering the sent confirmation.
- Production typecheck/build passes. QA screenshots are stored in `qa/clarification-modal/`.

**Final result: passed.**

## Compact final-reimbursement modal

- Reworked Final Decision Review to use the same 780 px header/body/footer structure as Request Clarification.
- Removed the internal review-progress component and “Ready for your decision” eyebrow.
- Promoted “Review the final reimbursement” and the assessment subtitle into the modal header.
- Kept Review results as the first content section.
- Moved Reimbursement beneath the results and placed Submitted and Excluded in two equal side-by-side columns.
- Kept Final reimbursement, the employee notification, reviewer acknowledgement, and all three footer actions.
- Verified the modal at 780 px, confirmed there is no progress component inside it, and measured equal 366 px reimbursement columns.
- Confirmed checking the acknowledgement enables the approval action.
- Production typecheck/build passes.

**Final result: passed.**

## AlignUI Fancy Button v1.2 integration

- Replaced the local approximation with the official AlignUI namespace API at `@/components/ui/fancy-button`.
- Added AlignUI's required Radix Slot, Tailwind Variants, class-merging, polymorphic, and recursive-child utilities.
- Preserved the documented `Root`/`Icon` composition, `asChild`, neutral/primary/destructive/basic variants, medium/small/xsmall sizes, filled highlight layers, disabled behavior, and inherited icon sizing.
- Added one controlled `success` extension for reimbursement actions using AlignUI's official success token; it shares the exact AlignUI component anatomy and interaction states.
- Confirmed every standalone CTA across evidence, extracted details, audit trail, policy, comparison, clarification, final decision, and approval states renders with `data-alignui="fancy-button"`.
- Verified the composed “Review next claim” icon inherits the root's medium sizing.
- Checked all audited desktop states at 1280 px with no horizontal overflow.

**Final result: passed.**

## Comparison identity-chip alignment

- Reserved a stable label column and a flexible value column in the comparison facts panel.
- Kept both claimant chips on one baseline with non-wrapping, non-truncated names and fixed-size avatar initials.
- Added explicit spacing between field labels and values so longer labels cannot visually collide with their data.
- Rechecked at 1280, 1440, 1567, and 1600 px desktop widths. Both names remain fully visible, aligned, and within the value column with no horizontal page overflow.
- Production typecheck/build passes and the browser console has no errors.

**Final result: passed.**

## Final decision modal redesign

- Replaced the standalone final-reimbursement page with a centered modal over the active evidence-review workspace.
- Preserved the exact SVG review progress, review results, reimbursement calculation, reviewer acknowledgement, and all three decision actions.
- Added a dedicated close control and kept Return to review as an explicit footer action.
- The Approve action remains disabled until the reviewer acknowledgement is selected.
- Opening Reject claim temporarily replaces the decision dialog with the rejection dialog; cancelling restores the final-decision modal.
- Verified close, return, acknowledgement, approve enablement, rejection, and rejection-cancel paths.
- Rechecked at `1280 × 800`, `1440 × 900`, and `1567 × 964`. The modal remains centered, fits without internal scrolling at those desktop sizes, and creates no page overflow.
- Production typecheck/build passes and the browser console has no errors. QA capture is stored in `qa/final-decision-modal/`.

**Final result: passed.**

## Review progress — Figma 6144:4677

- Fetched the exact design context, screenshot, child measurements, and five vector assets from Figma node `6144:4677`.
- Rebuilt the progress component at its fixed 354 × 51 px size with three 79 × 51 px step frames at x `0`, `137.5`, and `275`.
- Matched the 28 px icon fields, 8 px icon-to-label gap, 10/15 px Certia labels, completed/current/upcoming visual states, and the connector positions and lengths.
- Replaced the previous mixed CSS/export construction with the exact Figma SVG exports for Review evidence, Resolve findings, Make decision, and both connector lines.
- Confirmed in-browser that every asset inside the component resolves to `.svg`; no PNG is rendered.
- Rechecked at 1280, 1440, 1567, and 1600 px desktop widths. The component remains 354 × 51 px with no page overflow.
- Production typecheck/build passes and the browser console has no errors. Reference and implementation captures are stored in `figma-reference/progress-6144-4677/` and `qa/figma-6144-4677/`.

**Final result: passed.**

## Hotel icon orientation correction

- Removed the vertically flipped exported hotel asset from every visible hotel context.
- Standardized the expense row, matching-signal list, extracted-details row, and duplicate-comparison row on the upright Huge Icons `BedDoubleIcon`.
- Corrected the dynamic Taxi, Restaurant, and Airline detail rows to use their own Huge Icons instead of the hotel glyph.
- Verified the evidence, extracted-details, and comparison states at `1567 × 964`; all hotel glyphs render with `transform: none`.
- Production typecheck/build passes and the browser console has no errors. The evidence-state capture is stored in `qa/icon-orientation-fix/`.

**Final result: passed.**

## Claim navigation controls — Figma 6144:4501

- Fetched the exact design context, isolated screenshot, and node measurements from Figma node `6144:4501`.
- Replaced the exported SVG stand-ins with the intended Huge Icons: `ArrowLeft02Icon` and `SquareArrowDown01Icon`; the Previous control rotates the square-arrow glyph 180 degrees.
- Matched the fixed control geometry exactly: 115 × 26 px overall, 29 px between Back and pagination, 8 px within the pagination pair, and 26 × 26 px buttons with centered 14 × 14 px glyphs.
- Matched the Figma button chrome: white fill, `#E2E4E9` border, 6 px corners, `0 1px 2px rgba(0,0,0,.05)` drop shadow, and the two specified inset shadows.
- Rechecked at 1280, 1440, 1567, and 1600 px desktop widths. The control group remains 115 × 26 px at the same viewport position and creates no horizontal overflow.
- Production typecheck/build passes and the browser console has no errors. Reference and implementation captures are stored in `figma-reference/nav-6144-4501/` and `qa/figma-6144-4501/`.

**Final result: passed.**

## Review footer buttons — Figma 6144:4748

- Fetched the exact design context, screenshot, and node measurements from Figma node `6144:4748`.
- Matched the three equal-width 40 px controls with 15 px gaps and 10 px corner radii.
- The later AlignUI-specific request supersedes the original Figma paint while retaining this footer geometry.
- Resting values now match the live AlignUI v1.2 component: primary `#335CFF`, destructive `#FB3748`, basic `#FFFFFF`, 1 px same-color/soft-neutral keylines, and subtle non-inset shadows.
- Approval extends the same construction with AlignUI success `#1FC16B`.
- Removed the white exterior border, heavy colored ring, inset shadow, and active translation that made the controls look clicked before interaction.
- Confirmed rendered values in-browser at `1545 × 964`: 40 px height, 10 px corners, 14 px medium text, 20 px line height, no border, no transform, and no inset shadow.
- Production typecheck/build passes. Reference and implementation captures are stored in `figma-reference/button-6144-4748/` and `qa/figma-6144-4748/`.

**Final result: passed.**
