// services/emailService.js
import { otpTemplate } from '../utils/emailTemplate.js';
import { SMTP_USER } from "../config/env.js";
import transporter from "../config/mailer.js";


export const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: `"BlockEstate" <${SMTP_USER}>`,
        to,
        subject: "Your OTP Code",
        html: otpTemplate(otp),
    };

    await transporter.sendMail(mailOptions);
};