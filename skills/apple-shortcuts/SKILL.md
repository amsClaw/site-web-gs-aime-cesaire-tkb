---
name: "apple-shortcuts"
description: "Run or prepare Apple Shortcuts automations for OpenClaw workflows."
---

# Apple Shortcuts

Use when Ams asks to run, list, design, or document Apple Shortcuts / Raccourcis.

## Best Use

- Mobile entry points for OpenClaw: capture an idea, create a project note, add a reminder, open the dashboard, launch a script.
- Keep shortcuts small and reliable; avoid large fragile automations.

## Safety

- Confirm before creating shortcuts that send messages, emails, publish content, spend money, or change external data.
- Do not store secrets inside shortcuts.
- Prefer actions that call existing scripts or open URLs instead of duplicating complex logic.

## CLI Basics

```bash
shortcuts list
shortcuts run "Shortcut Name"
shortcuts view "Shortcut Name"
```

Availability varies by macOS version and permissions. If `shortcuts` is missing or blocked, state the limitation.

## Workflow

1. Identify whether the task is to run an existing shortcut or design a new one.
2. For running: list/check exact shortcut name first when uncertain.
3. For design: produce a simple step list that Ams can inspect.
4. Prefer naming convention: `OpenClaw - Action`.
5. Verify by running only when safe and explicitly requested.

## Good Shortcut Ideas

- `OpenClaw - Ajouter une idée`
- `OpenClaw - Créer note terrain`
- `OpenClaw - Ajouter rappel projet`
- `OpenClaw - Ouvrir dashboard`
- `OpenClaw - Revue hebdo`

## Output

Report what was run or designed, and the next manual step if creation cannot be fully automated.
