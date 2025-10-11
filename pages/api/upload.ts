import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import dotenv from "dotenv";

dotenv.config();

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.ping().then((res) =>{
  console.log("cloudnary connected ", res);
})
.catch((err) =>{
  console.log("cloudnary err", err);
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files: any) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "Form parse error", error: err });
    }
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    try {
      const uploadResult = await cloudinary.uploader.upload(file.filepath, {
        folder: "products",
      });

      return res.status(200).json({
        message: "Uploaded successfully!",
        url: uploadResult.secure_url,
      }); 
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ message: "Upload failed", error });
    }
  });
}
