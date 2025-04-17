// services/email.service.js
import { otpTemplate } from '../utils/otpEmailTemplate.utils.js';
import { SMTP_USER } from "../config/env.config.js";
import transporter from "../config/mailer.config.js";
import {welcomeTemplate} from "../utils/welcomeEmailTemplate.js";
import {welcomeAgencyTemplate} from "../utils/welcomeAgencyEmailTemplate.js";


export const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: `"BlockEstate" <${SMTP_USER}>`,
        to,
        subject: "Your OTP Code",
        html: otpTemplate(otp),
    };

    await transporter.sendMail(mailOptions);
};

export const sendWelcomeEmail = async (to, name) => {
    const mailOptions = {
        from: `"BlockEstate" <${SMTP_USER}>`,
        to,
        subject: "Welcome to BlockEstate! 🎉",
        html: welcomeTemplate(name),
    };
    await transporter.sendMail(mailOptions);
};

export const sendAgencyWelcomeEmail = async (to, name) => {
    const mailOptions = {
        from: `"BlockEstate" <${SMTP_USER}>`,
        to,
        subject: "Welcome to BlockEstate! 🎉",
        html: welcomeAgencyTemplate(name),
    };
    await transporter.sendMail(mailOptions);
};