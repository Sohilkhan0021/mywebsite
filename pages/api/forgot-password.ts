import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import crypto from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email } = req.body;

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db("anmolji");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      client.close();
      return res.status(404).json({ message: "User not found" });
    }

 
    const token = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 1000 * 60 * 15; 

    await db.collection("users").updateOne(
      { email },
      { $set: { resetToken: token, resetTokenExpire } }
    );
    client.close();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset Request",
      text: `Click here to reset your password: ${resetUrl}`,
      html: `<p>Click here to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    });

    return res.status(200).json({ message: "Password reset email sent!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
