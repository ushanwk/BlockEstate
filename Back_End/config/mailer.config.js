import nodemailer from 'nodemailer';
import { SMTP_USER, SMTP_PASS } from "./env.config.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

export default transporter;
