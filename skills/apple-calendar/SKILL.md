---
name: "apple-calendar"
description: "Create, inspect, and manage Apple Calendar events for OpenClaw planning."
---

# Apple Calendar

Use when Ams asks to create, inspect, update, or reason about Apple Calendar events.

## Best Use

- Project reviews, weekly rituals, milestones, meetings, field tests, demos, and follow-ups.
- Use Calendar for time blocks and appointments, not small to-dos; use Apple Reminders for tasks.

## Safety

- Confirm before creating invitations involving third parties.
- Confirm before deleting or moving existing events.
- Use explicit dates and Europe/Paris timezone when the user says today, tomorrow, or a time.

## Workflow

1. Clarify date/time only if ambiguous or risky.
2. Choose the simplest target calendar, usually the default calendar.
3. Create readable event titles beginning with project context, e.g. `OpenClaw - Revue CRM école`.
4. Put context and next action in the event notes.
5. Verify creation by listing or reading the created event when practical.

## AppleScript Pattern

Use `osascript` with Calendar.app for automation. Prefer non-destructive operations.

```applescript
tell application "Calendar"
  tell calendar "Calendar"
    make new event with properties {summary:"OpenClaw - Revue projet", start date:date "Friday, June 19, 2026 at 9:00:00 PM", end date:date "Friday, June 19, 2026 at 9:30:00 PM", description:"Objectif: reprendre le sujet et décider la prochaine action."}
  end tell
end tell
```

If calendar names differ, first list calendars:

```bash
osascript -e 'tell application "Calendar" to get name of every calendar'
```

## Output

Confirm title, date/time, calendar, and any caveat.
