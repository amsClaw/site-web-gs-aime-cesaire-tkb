#!/usr/bin/env node
/**
 * Send email via Gmail SMTP using nodemailer.
 * Usage:
 *   node scripts/send-email.js <to> <subject> <body> [--html]
 *
 * Environment variables (set in openclaw.json env):
 *   SMTP_USER="amsfox@gmail.com"
 *   SMTP_PASS="xxxx xxxx xxxx xxxx"
 *   SMTP_FROM="amsfox@gmail.com"
 */
const nodemailer = require("nodemailer");

const [to, subject, body, format] = process.argv.slice(2);
const isHtml = format === "--html";

if (!to || !subject || !body) {
  console.error(
    "Usage: node scripts/send-email.js <to> <subject> <body> [--html]"
  );
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
  from: `"amsClaw Agent" <${process.env.SMTP_USER}>`,
  to,
  subject,
  ...(isHtml ? { html: body } : { text: body }),
};

transporter
  .sendMail(mailOptions)
  .then((info) => {
    console.log(`Email sent: ${info.messageId}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Failed: ${err.message}`);
    process.exit(1);
  });
