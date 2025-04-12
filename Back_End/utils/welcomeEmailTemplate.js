export const welcomeTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    
    <h1 style="color: #0274F9; text-align: center;">Welcome to BlockEstate 🎉</h1>
    
    <p style="font-size: 16px; color: #333;">
      Hey ${name},
    </p>
    
    <p style="font-size: 16px; color: #333;">
      We're excited to have you on board as an investor! 🚀 <br/>
      You now have access to a smarter way to invest in real estate via our blockchain-powered platform.
    </p>

    <p style="font-size: 16px; color: #333;">
      If you have any questions, feel free to reply to this email—we're here to help!
    </p>

    <p style="font-size: 16px; color: #333;">Cheers,<br/><strong>The BlockEstate Team</strong></p>

    <hr style="margin: 30px 0;">

    <p style="font-size: 12px; color: #888; text-align: center;">
      © ${new Date().getFullYear()} BlockEstate Inc. All rights reserved.
    </p>
  </div>
`;
