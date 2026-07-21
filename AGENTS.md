# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Selected direction

- The user selected the third generated direction on 2026-07-15.
- The implementation source of truth is now the user's polished Figma queue (`6005:2556`) and claim workspace (`6037:12225`) in file `KpbkqjxFlRB3LCGSwJhXMU`.
- Preserve the evidence-first layout and three-step review progress, but use the polished light 62px rail, compact table density, white working surfaces, #EBEBEB borders, #335CFF interaction color, semantic status pills, and minimal elevation.
- The queue should show risk as a filter/input to prioritization, not as a permanent table column. Keep AI review and claim status as icon-supported pills.
- Treat the Figma file as a read-only visual reference for code implementation unless the user explicitly asks for Figma edits.
- Use the assignment's canonical 8–12 May 2026 trip dates even where the generated concept image rendered different dates.
- Serve receipt images with AVIF as the preferred format and PNG as a fallback; the evidence canvas must never appear blank while a receipt loads.
- Treat the claim as the decision object and the claimant as context: combine claimant and claim in one header identity block, with prior claims available only on demand.
