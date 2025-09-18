import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    res.status(200).json({ success: true, message: "MongoDB connected successfully" });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ success: false, message: "MongoDB connection failed" });
  }
}
