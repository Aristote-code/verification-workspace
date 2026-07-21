# Design QA — Verification Workspace

- Source visual truth: polished Figma queue `6005:2556` and claim workspace `6037:12225`
- Viewport: 1440 × 1024 desktop
- State: Claim `EXP-2841`, Riverside Grand Hotel selected, two findings unreviewed

## Findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: Inter is the available web-safe approximation for Certia; Geist Mono remains reserved for financial values. The compact hierarchy, labels, and restrained weights match the polished Figma screens without clipping.
- Spacing and layout rhythm: the 62px light rail, compact 50px queue rows, reduced claim briefing band, dominant evidence canvas, review stepper, and persistent decision area preserve the new Figma composition.
- Colors and visual tokens: white surfaces, #EBEBEB borders, #335CFF interactions, semantic green/amber/red pills, and minimal shadows map directly to the polished Figma direction. Status meaning is reinforced with icons and text.
- Image quality and asset fidelity: the app uses generated high-resolution raster evidence for the current hotel invoice, matched hotel invoice, dinner receipt, taxi receipt, and flight ticket. No document or non-standard visible asset is replaced by CSS art, emoji, or a placeholder.
- Copy and content: claim data follows the approved scenario. The implementation intentionally corrects the concept image's generated dates to the canonical 8–12 May 2026 trip window.

## Comparison History

### Pass 1 — blocked

- [P2] The evidence document was visually smaller than the selected concept. Increased the default and fit zoom from 82% to 92%.
- [P2] Claim-header metadata clipped at the target viewport. Rebalanced header columns and tightened the employee text treatment.
- [P2] Success notifications remained on screen during later presentation steps. Added automatic dismissal after 3.6 seconds while retaining manual dismissal.
- [P3] Remaining-count copy used plural grammar for one finding. Added singular/plural handling.

Evidence: `qa-comparison-pass1.png`.

### Pass 2 — passed

- The receipt is again the dominant evidence surface.
- Header measurements confirm no clipping for employee, trip, amount, or queue position.
- Focused review-panel comparison confirms the same step hierarchy, finding anatomy, evidence grouping, semantic colors, and human-owned decision controls.
- Remaining deviations are intentional functional extensions: evidence tabs, audit history, and the internal-note action.

Evidence: `qa-comparison-final.png`, `qa-focus-header.png`, and `qa-focus-review-panel.png`.

## Interaction and Browser Verification

- Opened Maya Chen's claim from the compact thirteen-row queue.
- Verified queue search returns the expected single result for “Maya”.
- Opened the duplicate comparison, selected a required dismissal reason, and confirmed the audit-trail update.
- Applied the €50 policy limit and confirmed the reimbursement recalculated to €1,230.
- Verified approval remains disabled until both findings are reviewed and the reviewer acknowledgement is checked.
- Completed approval and confirmed the decision-complete state.
- Reloaded and completed the clarification branch through its awaiting-response state.
- Verified both 1440 × 1024 and 1280 × 800 layouts. The evidence, finding actions, and sticky decision controls remain visible without body-level horizontal overflow.
- Browser console warnings/errors: none.
- TypeScript check and production build: passed.

## Follow-up Polish

- [P3] A future motion pass could add a subtle 140–180ms crossfade between primary workflow screens.

final result: passed
