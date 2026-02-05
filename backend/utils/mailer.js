import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MGC_EMAIL,
    pass: process.env.MGC_PASSWORD,
  },
});

export const sendMail = async ({ to, subject, html, attachments }) => {
  return transporter.sendMail({
    from: `Verification Code ${process.env.MGC_EMAIL}`,
    to,
    subject,
    html,
    attachments,
  });
};