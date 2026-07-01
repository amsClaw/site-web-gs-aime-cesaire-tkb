---
name: "apple-finder-documents"
description: "Organize Finder files and project documents for OpenClaw workspaces."
---

# Apple Finder Documents

Use when Ams asks to create, copy, move, rename, inspect, or organize files and folders on macOS for OpenClaw projects.

## Best Use

- Downloads cleanup, project folders, reports, exports, screenshots, HTML files, Excel files, backups.
- Prefer simple filesystem commands and existing OpenClaw project structure.

## Safety

- Confirm before deleting files or replacing non-generated files.
- Never overwrite user files without checking existence first.
- Keep workspace bootstrap/reference files read-only unless explicitly instructed.
- Journal important file moves, installations, scripts, and folder reorganizations when they affect projects.

## Workflow

1. Inspect with `rg --files`, `ls`, `find`, or `stat` before changing files.
2. Keep operations scoped to the requested project or folder.
3. Use descriptive filenames with dates for reports and backups.
4. Copy before moving when the user may still need the original.
5. Verify with `ls -l`, `stat`, or `find` after changes.

## Commands

```bash
ls -la ~/Downloads
find ~/Downloads -maxdepth 1 -type f -name '*.html' -print
mkdir -p /path/to/folder
cp source target
mv source target
open /path/to/file
```

## Output

Confirm exact path(s), operation performed, and any remaining cleanup suggestion.
