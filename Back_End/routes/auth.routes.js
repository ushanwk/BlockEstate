import { Router } from 'express';
import { sendOtpEmail } from "../services/emailService.js";

const authRouter = Router();

authRouter.post('/register-otp', async(req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    const expiresAt = Date.now() + 3 * 60 * 1000;

    try {
        await sendOtpEmail(email, otp);
        res.json({ message: "OTP sent successfully", otp, expiresAt });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

authRouter.get('/register', (req, res) => {
    res.send({message: "Auth sign up!"});
});

export default authRouter;