import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import MetalCraftSection from "@/models/MetalCraftSection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const section = await MetalCraftSection.findOne();
    return res.status(200).json(section);
  }

  if (req.method === "POST") {
    try {
      const { images } = req.body;

      let section = await MetalCraftSection.findOne();
      if (section) {
        section.images = images;
        await section.save();
      } else {
        section = await MetalCraftSection.create({ images });
      }

      return res.status(200).json({ success: true, section });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
