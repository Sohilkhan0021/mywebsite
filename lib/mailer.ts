import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (to: string, username: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS, 
    },
  });

  const mailOptions = {
    from: `"The ANMOL CRAFT&CREATION" <${process.env.SMTP_USER}>`,
    to,
    subject: "Welcome to The ANMOL CRAFT&CREATION !",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px">
        <div style="max-width:600px; margin:auto; background:#000; color:#fff; padding:20px; border-radius:8px;">
          <img src="/images/satyam-img.jpg" alt="logo" style="max-width:200px;" />
          <h2>Welcome to  ANMOL CRAFT & CREATION!</h2>
          <p>Dear ${username},</p>
          <p>Greetings from  ANMOL CRAFT & CREATION</p>
          <p>Thank you for registering with us.</p>
          <p><b>Username:</b> ${to}</p>
          <p>We request you to make note of this information for future reference.</p>
          <br/>
          <a href="https://satyamweb.vercel.app/" style="background:green; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Visit our store</a>
          <br/><br/>
          <p>Warm Regards,<br/>Customer Support<br/> ANMOL CRAFT & CREATION</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
