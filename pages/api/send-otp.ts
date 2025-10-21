import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type OtpRecord = { otp: string; expiresAt: number };
const otpStore: Record<string, OtpRecord> = (globalThis as any).__OTP_STORE__ || {};
if (!(globalThis as any).__OTP_STORE__) (globalThis as any).__OTP_STORE__ = otpStore;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  otpStore[email] = { otp, expiresAt };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ANMOL CRAFT&CREATION" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Signup OTP Code",
      text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
}
