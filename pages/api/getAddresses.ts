import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { id } = req.query;
    // console.log("shoili",req.query.id);
    if (!id || typeof id !== "string") {
      return res.status(400).json({ success: false, error: "User ID is required" });
    }

    const user = await User.findById(id).select("address");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.error("Get address error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
