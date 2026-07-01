---
name: "apple-notes-presentables"
description: "Format Apple Notes output with readable titles, bullets, and bold key points."
---

# Apple Notes Presentables

Use whenever creating or editing a note in Apple Notes for Ams.

## Rule

Every Apple Note created or modified by the agent must be immediately readable and presentable.

## Formatting Defaults

- Use a clear title at the top of the note.
- Structure content with short sections and visible headings.
- Prefer bullet points for lists, recommendations, steps, risks, and examples.
- Put important words, decisions, warnings, and next actions in bold.
- Avoid long flat paragraphs unless the user explicitly asks for prose.
- Keep the note useful on mobile: concise sections, scannable lines, no excessive nesting.
- Never store passwords, API keys, tokens, or other secrets in Apple Notes.

## Suggested Structure

1. Title
2. Objective or context
3. Key points
4. Details or checklist
5. Next action

## Implementation Hint

When using AppleScript or `memo` to create a note, prefer HTML-like formatting supported by Apple Notes, for example headings, unordered lists, and `<b>` tags for emphasis.

## Verification

After creating or updating the note, briefly confirm the folder and the presentation choices made.
