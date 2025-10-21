// pages/api/verify-otp.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  // Access stored OTPs
  const otpStore: Record<string, { otp: string; expiresAt: number }> =
    (globalThis as any).__OTP_STORE__ || {};

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  if (record.expiresAt < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // ✅ OTP correct — delete it so it can’t be reused
  delete otpStore[email];

  return res.status(200).json({ message: "OTP verified successfully" });
}
