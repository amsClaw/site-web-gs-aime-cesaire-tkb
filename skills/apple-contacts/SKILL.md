---
name: "apple-contacts"
description: "Search, create, and organize Apple Contacts with privacy safeguards."
---

# Apple Contacts

Use when Ams asks to search, create, update, or organize Apple Contacts.

## Best Use

- Prospects, schools, partners, service providers, agents, and useful project contacts.
- Use Contacts for stable people/organizations, not temporary notes.

## Safety

- Confirm before creating, editing, merging, or deleting contacts.
- Never mass-import contacts without explicit approval and a reviewed source file.
- Do not expose phone numbers, addresses, or private contact data unless directly needed.
- Keep sensitive notes out of contact cards.

## Workflow

1. Search first before creating a new contact to avoid duplicates.
2. Use simple contact names and organization fields.
3. Add project context in a short note only when helpful.
4. Prefer creating a contact only after Ams confirms the person should be kept.
5. Verify by searching the contact after creation/edit.

## AppleScript Patterns

List/search can be done with Contacts.app through AppleScript when permissions allow.

```bash
osascript -e 'tell application "Contacts" to get name of every person whose name contains "Dupont"'
```

Creation should be confirmed first.

## Output

Confirm whether the contact was found, created, or left unchanged.
