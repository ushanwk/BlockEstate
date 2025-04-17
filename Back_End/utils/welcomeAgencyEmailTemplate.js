export const welcomeAgencyTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    
    <h1 style="color: #0274F9; text-align: center;">Welcome to BlockEstate 🏢</h1>
    
    <p style="font-size: 16px; color: #333;">
      Hello ${name},
    </p>
    
    <p style="font-size: 16px; color: #333;">
      We’re thrilled to welcome you as an agency partner on BlockEstate! 🥳 <br/>
      Your agency is now part of a revolutionary platform where real estate meets the power of blockchain.
    </p>

    <p style="font-size: 16px; color: #333;">
      Our team will review your documents shortly. Once verified, you'll be able to list properties, connect with investors, and manage everything seamlessly.
    </p>

    <p style="font-size: 16px; color: #333;">
      If you have any questions, just reply to this email or reach out to our support team—we’re always happy to assist!
    </p>

    <p style="font-size: 16px; color: #333;">Warm regards,<br/><strong>The BlockEstate Team</strong></p>

    <hr style="margin: 30px 0;">

    <p style="font-size: 12px; color: #888; text-align: center;">
      © ${new Date().getFullYear()} BlockEstate Inc. All rights reserved.
    </p>
  </div>
`;
