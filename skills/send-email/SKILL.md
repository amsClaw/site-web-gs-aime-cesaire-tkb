---
name: "send-email"
description: "Send emails via Gmail SMTP using local nodemailer script."
---

# Send Email

Send emails from the configured Gmail agent account (`amsfox@gmail.com`) using a local Node.js script with nodemailer.

## Usage

```sh
node scripts/send-email.js "<to>" "<subject>" "<body>" [--html]
```

- `--html` optional flag when body is HTML instead of plain text
- SMTP credentials are in `openclaw.json` env (`SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`)

## Example — plain text

```sh
node scripts/send-email.js "destinataire@example.com" "Bonjour" "Message texte ici"
```

## Example — HTML

```sh
node scripts/send-email.js "destinataire@example.com" "Newsletter" "<h1>Titre</h1><p>Contenu HTML</p>" --html
```

## Error handling

- Returns `Email sent: <messageId>` on success.
- Returns `Failed: <reason>` on failure (wrong address, SMTP error, network).
- Exit code 0 on success, 1 on failure.

## Requirements

- nodemailer installed at workspace root (`node_modules/nodemailer/`)
- Script at `scripts/send-email.js`
- Env vars in `openclaw.json`: `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

## Limitations

- Only SMTP (no IMAP receive yet)
- No attachments in current version
- Gmail limit: ~500 emails/day
