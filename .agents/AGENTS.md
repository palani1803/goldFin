# Project Rules

- **Git Control Directive**: Do NOT automatically stage (`git add`), commit (`git commit`), or push (`git push`) code changes to GitHub. Only perform code edits and local builds unless explicitly requested by the user.
- **No Automated Browser Inspection Directive**: Do NOT automatically open Chrome or run browser subagents for DOM inspection or UI verification. Let the user inspect and verify UI changes manually.
- **Impeccable UI Alignment & Visual Balance Directive**: Whenever adding, editing, or deleting any UI elements, components, cards, forms, or badges:
  - Always verify and ensure horizontal and vertical alignment across all cards and containers.
  - Maintain equal card heights (`items-stretch`, `h-full`, `flex flex-col justify-between`), consistent padding, and aligned headers/footers.
  - Avoid awkward text wrapping or cramped labels by properly calibrating typography sizes, tag widths, and responsive grid column spans (`sm:`, `md:`, `lg:`, `xl:`).
  - Verify aesthetic polish, color harmony, and layout proportion on every change.

