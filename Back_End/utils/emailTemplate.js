export const otpTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    
    <h1 style="color: #0274F9; text-align: center;">BlockEstate</h1>
    
    <p style="font-size: 16px; color: #333;">
      Hi there 👋,
    </p>
    
    <p style="font-size: 16px; color: #333;">
      Thanks for signing up with <strong>BlockEstate</strong>. To complete your registration, please verify your email address by entering the OTP below:
    </p>

    <div style="text-align: center; margin: 20px 0;">
      <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; background-color: #f3f4f6; padding: 10px 20px; border-radius: 6px; display: inline-block;">
        ${otp}
      </span>
    </div>

    <p style="font-size: 14px; color: #555;">
      This code will expire in <strong>10 minutes</strong>. If you didn’t request this, you can safely ignore this email.
    </p>

    <hr style="margin: 30px 0;">

    <p style="font-size: 12px; color: #888; text-align: center;">
      © ${new Date().getFullYear()} BlockEstate Inc. All rights reserved.
    </p>
  </div>
`;
