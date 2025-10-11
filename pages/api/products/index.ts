// import type { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";
// import path from "path";
// import formidable from "formidable";
// import dbConnect from "@/lib/mongodb";
// import Product from "@/models/Product";

// export const config = { api: { bodyParser: false } };

// const allowedAdmins = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   if (req.method === "POST") {
//     const uploadDir = path.join(process.cwd(), "public/images");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

//     form.parse(req, async (err, fields, files: any) => {
//       if (err) return res.status(500).json({ message: "File upload failed" });

//       const { title, subtitle, category, details, price, email } = fields;
//       const emailStr = Array.isArray(email) ? email[0] : email;

//       if (!emailStr || !allowedAdmins.includes(emailStr))
//         return res.status(403).json({ message: "Not authorized" });

//       const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
//       if (!uploadedFile) return res.status(400).json({ message: "No file uploaded" });

//       const ext = path.extname(uploadedFile.originalFilename || "");
//       const baseName = path.basename(uploadedFile.originalFilename || "image", ext);
//       const uniqueName = `${baseName}-${Date.now()}${ext}`;
//       const newPath = path.join(uploadDir, uniqueName);

//       try {
//         fs.renameSync(uploadedFile.filepath || uploadedFile.path, newPath);
//       } catch (error) {
//         console.error("Rename error:", error);
//         return res.status(500).json({ message: "Failed to save image" });
//       }

//       const imgPath = `/images/${uniqueName}`;

//       try {
//         const newProduct = await Product.create({
//           title,
//           subtitle,
//           category,
//           details,
//           price: Number(price),
//           img: imgPath,
//         });
//         return res.status(200).json(newProduct);
//       } catch (error) {
//         console.error("MongoDB save error:", error);
//         return res.status(500).json({ message: "Failed to save product" });
//       }
//     });
//   }

//   else if (req.method === "GET") {
//     try {
//       const products = await Product.find({});
//       return res.status(200).json(products);
//     } catch (error) {
//       return res.status(500).json({ message: "Failed to fetch products" });
//     }
//   }

//   else if (req.method === "DELETE") {
//     const { id, email } = req.query;

//     if (!id) return res.status(400).json({ message: "Product id required" });
//     if (!email || !allowedAdmins.includes(email as string))
//       return res.status(403).json({ message: "Not authorized" });

//     try {
//       const product = await Product.findByIdAndDelete(id as string);
//       if (!product) return res.status(404).json({ message: "Product not found" });

//       if (product.img) {
//         const imgPath = path.join(process.cwd(), "public", product.img);
//         if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
//       }

//       return res.status(200).json({ message: "Deleted successfully" });
//     } catch (error) {
//       return res.status(500).json({ message: "Failed to delete product" });
//     }
//   }

//   else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }























import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export const config = { api: { bodyParser: false } };

const allowedAdmins = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files: any) => {
      if (err) return res.status(500).json({ message: "Form parsing failed", error: err });

      const { title, subtitle, category, details, price, email } = fields;
      const emailStr = Array.isArray(email) ? email[0] : email;

      if (!emailStr || !allowedAdmins.includes(emailStr)) {
        return res.status(403).json({ message: "Not authorized" });
      }
      const uploadedFile =
        files.image
          ? Array.isArray(files.image) ? files.image[0] : files.image
          : Array.isArray(files.file) ? files.file[0] : files.file;

      if (!uploadedFile) {
        return res.status(400).json({ message: "No image file received" });
      }

      try {
       console.log("FILES RECEIVED:", files);

       const filePath = uploadedFile.filepath || uploadedFile.path;
        const normalizedPath = filePath.replace(/\\/g, "/"); // Fix Windows path
        const uploadResult = await cloudinary.uploader.upload(normalizedPath, {
          folder: "products",
        });


   
        const newProduct = await Product.create({
          title,
          subtitle,
          category,
          details,
          price: Number(price),
          img: uploadResult.secure_url,
        });

        return res.status(200).json(newProduct);
      } catch (error) {
        console.error("Cloudinary/MongoDB error:", error);
        return res.status(500).json({ message: "Upload or save failed", error });
      }
    });
  }

  else if (req.method === "GET") {
    try {
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  }

  else if (req.method === "DELETE") {
    const { id, email } = req.query;

    if (!id) return res.status(400).json({ message: "Product ID required" });
    if (!email || !allowedAdmins.includes(email as string)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    try {
      const product = await Product.findByIdAndDelete(id as string);
      if (!product) return res.status(404).json({ message: "Product not found" });

      // ✅ Delete Cloudinary image too
      if (product.img) {
        const parts = product.img.split("/");
        const fileName = parts[parts.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`products/${fileName}`).catch(() => {});
      }

      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      return res.status(500).json({ message: "Failed to delete product" });
    }
  }

  else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
