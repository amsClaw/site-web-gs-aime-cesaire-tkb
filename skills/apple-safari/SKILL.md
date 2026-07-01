---
name: "apple-safari"
description: "Open, inspect, and automate Safari pages with cautious browser workflows."
---

# Apple Safari

Use when Ams asks to open pages, inspect browser tabs, or perform simple Safari automation.

## Best Use

- Opening dashboards, local apps, docs, searches, account settings, and manually supervised web flows.
- Use dedicated web/browser tools when available for complex automation; Safari is best for user-visible actions.

## Safety

- Confirm before submitting forms, purchasing, subscribing, publishing, sending messages, or changing account settings.
- Do not automate sensitive account/security pages beyond navigation unless Ams explicitly guides the action.
- Avoid storing passwords or secrets.

## Workflow

1. Open the requested URL or local file in Safari.
2. For inspection, list tab names/URLs when useful.
3. For automation, prefer small visible steps and stop before irreversible actions.
4. Use screenshots or user confirmation when page state matters.

## AppleScript Patterns

```bash
osascript -e 'tell application "Safari" to open location "https://example.com"'
osascript -e 'tell application "Safari" to get URL of every tab of every window'
```

## Output

Confirm what was opened or inspected, and clearly state any action that still needs human confirmation.
