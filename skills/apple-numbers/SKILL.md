---
name: "apple-numbers"
description: "Create, inspect, and prepare Apple Numbers spreadsheets for project tracking."
---

# Apple Numbers

Use when Ams asks to create, inspect, prepare, or export Numbers spreadsheets for OpenClaw projects.

## Best Use

- Lightweight tracking tables, prospect lists, school/payment follow-up, project inventories, exports for review.
- For robust data processing, prefer CSV/XLSX with scripts first, then open or convert for Numbers if useful.

## Safety

- Confirm before editing important existing spreadsheets in place.
- Prefer creating a copy or export beside the original.
- Preserve formulas and sheets when inspecting existing files; avoid blind rewrites.

## Workflow

1. Identify source format: `.numbers`, `.xlsx`, `.csv`, or new table.
2. For `.xlsx`/`.csv`, use deterministic tools to inspect/prepare data before opening in Numbers.
3. Use clear columns, short headers, and readable project context.
4. Save/export with meaningful file names and dates when generated.
5. Verify row/column counts or sample rows after processing.

## Useful Commands

```bash
open -a Numbers /path/to/file.xlsx
qlmanage -p /path/to/file.numbers
```

For generated spreadsheets, prefer Node/Python libraries already present in the project, such as ExcelJS when the project uses it.

## Output

Confirm file path, format, key columns, and any manual Numbers step required.
