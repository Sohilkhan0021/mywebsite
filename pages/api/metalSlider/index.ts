import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/mongodb";
import MetalSlider from "@/models/MetalSliderImage";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const form = formidable({ multiples: false });
      const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!file) return res.status(400).json({ message: "No file uploaded" });

      const filePath = file.filepath || file.path;
      if (!filePath) return res.status(400).json({ message: "File path missing" });

     
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "metalSlider",
      });

      const newImage = await MetalSlider.create({ img: result.secure_url });
      return res.status(201).json({ message: "Uploaded successfully", ...newImage.toObject() });
    } catch (error: any) {
      console.error("Upload failed:", error);
      return res.status(500).json({ message: error.message || "Something went wrong" });
    }
  }

  if (req.method === "GET") {
    try {
      const images = await MetalSlider.find().sort({ createdAt: -1 });
      return res.status(200).json(images);
    } catch (error) {
      console.error("Fetch error:", error);
      return res.status(500).json({ message: "Failed to fetch images" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id, url } = req.query;
      if (!id || !url) return res.status(400).json({ message: "Missing id or url" });

      const parts = (url as string).split("/");
      const filename = parts[parts.length - 1].split(".")[0];
      const publicId = `metalSlider/${filename}`;

      await cloudinary.uploader.destroy(publicId).catch(() => {});


      await MetalSlider.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.error("DELETE failed:", error);
      return res.status(500).json({ message: "Failed to delete image" });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
