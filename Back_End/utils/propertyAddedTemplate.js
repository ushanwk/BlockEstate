export const propertyAddedTemplate = (agencyName, propertyName) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    
    <h1 style="color: #0274F9; text-align: center;">New Property Listed 🏠</h1>
    
    <p style="font-size: 16px; color: #333;">
      Hello,
    </p>
    
    <p style="font-size: 16px; color: #333;">
      Great news! Your property <strong>"${propertyName}"</strong> has been successfully added to the BlockEstate platform. 🎉
    </p>

    <p style="font-size: 16px; color: #333;">
      Investors from around the world can now view and invest in your property. Make sure to keep your listing details up to date for the best results.
    </p>

    <p style="font-size: 16px; color: #333;">
      If you need any help or want to make changes, feel free to reach out to our support team anytime.
    </p>

    <p style="font-size: 16px; color: #333;">Best regards,<br/><strong>The BlockEstate Team</strong></p>

    <hr style="margin: 30px 0;">

    <p style="font-size: 12px; color: #888; text-align: center;">
      © ${new Date().getFullYear()} BlockEstate Inc. All rights reserved.
    </p>
  </div>
`;
