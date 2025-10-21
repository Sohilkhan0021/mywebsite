// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "@/lib/mongodb";
// import Product from "@/models/Product";
// import cloudinary from "@/lib/cloudinary";
// import formidable from "formidable";

// export const config = { api: { bodyParser: false } };

// const allowedAdmins = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();
//   const { id } = req.query;

//   if (!id || Array.isArray(id)) return res.status(400).json({ message: "Invalid product ID" });

//   if (req.method === "GET") {
//     try {
//       const product = await Product.findById(id as string);
//       if (!product) return res.status(404).json({ message: "Product not found" });
//       return res.status(200).json(product);
//     } catch (error) {
//       console.error("GET error:", error);
//       return res.status(500).json({ message: "Failed to fetch product" });
//     }
//   }

//   else if (req.method === "DELETE") {
//     const { email } = req.body;
//     if (!email || !allowedAdmins.includes(email))
//       return res.status(403).json({ message: "Not authorized" });

//     try {
//       const product = await Product.findByIdAndDelete(id as string);
//       if (!product) return res.status(404).json({ message: "Product not found" });

//       if (product.img) {
//         const parts = product.img.split("/");
//         const fileName = parts[parts.length - 1].split(".")[0];
//         await cloudinary.uploader.destroy(`products/${fileName}`).catch(() => {});
//       }

//       return res.status(200).json({ message: "Deleted successfully" });
//     } catch (error) {
//       console.error("DELETE error:", error);
//       return res.status(500).json({ message: "Failed to delete product" });
//     }
//   }

//   else if (req.method === "PUT") {
//     const form = formidable({ multiples: false });

//     form.parse(req, async (err, fields, files: any) => {
//       if (err) return res.status(500).json({ message: "Form parsing failed", error: err });
    
//       const { title, subtitle, category, details, price, stock } = fields;

//       const email = String(req.body.email || "");
//       if (!email || !allowedAdmins.includes(email))
//       return res.status(403).json({ message: "Not authorized" });

//       try {
//         const product = await Product.findById(id as string);
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         const uploadedFile =
//           files.image
//             ? Array.isArray(files.image) ? files.image[0] : files.image
//             : Array.isArray(files.file) ? files.file[0] : files.file;
//             if (fields.stock) product.stock = Number(fields.stock);

//         if (uploadedFile) {
//           if (product.img) {
//             const parts = product.img.split("/");
//             const fileName = parts[parts.length - 1].split(".")[0];
//             await cloudinary.uploader.destroy(`products/${fileName}`).catch(() => {});
//           }

//           const filePath = uploadedFile.filepath || uploadedFile.path;
//           const normalizedPath = filePath.replace(/\\/g, "/"); 
//           const uploadResult = await cloudinary.uploader.upload(normalizedPath, {
//             folder: "products",
//           });

//           product.img = uploadResult.secure_url;
//         }

//         if (title) product.title = title;
//         if (subtitle) product.subtitle = subtitle;
//         if (category) product.category = category;
//         if (details) product.details = details;
//         if (price) product.price = Number(price);

//         await product.save();
//         return res.status(200).json(product);
//       } catch (error) {
//         console.error("PUT error:", error);
//         return res.status(500).json({ message: "Failed to update product", error });
//       }
//     });
//   }

//   else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }













































import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";

export const config = { api: { bodyParser: false } };

const allowedAdmins = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (!id || Array.isArray(id)) return res.status(400).json({ message: "Invalid product ID" });

  // ---------------- GET Product ----------------
  if (req.method === "GET") {
    try {
      const product = await Product.findById(id as string);
      if (!product) return res.status(404).json({ message: "Product not found" });
      return res.status(200).json(product);
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  }

  // ---------------- DELETE Product ----------------
  else if (req.method === "DELETE") {
    const { email } = req.body;
    if (!email || !allowedAdmins.includes(email))
      return res.status(403).json({ message: "Not authorized" });

    try {
      const product = await Product.findByIdAndDelete(id as string);
      if (!product) return res.status(404).json({ message: "Product not found" });

      // Delete image from Cloudinary if exists
      if (product.img) {
        const parts = product.img.split("/");
        const fileName = parts[parts.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`products/${fileName}`).catch(() => {});
      }

      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.error("DELETE error:", error);
      return res.status(500).json({ message: "Failed to delete product" });
    }
  }

  // ---------------- UPDATE Product (PUT) ----------------
  else if (req.method === "PUT") {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files: any) => {
      if (err) return res.status(500).json({ message: "Form parsing failed", error: err });

      const { title, subtitle, category, details, price, stock, email } = fields;
      const emailStr = Array.isArray(email) ? email[0] : email;
      console.log("FIELDS:", fields);
      console.log("FILES:", files);

      // ✅ FIX: Email check from fields, not req.body
      if (!emailStr || !allowedAdmins.includes(emailStr)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      try {
        const product = await Product.findById(id as string);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // ✅ Handle new image upload
        const uploadedFile =
          files.image
            ? Array.isArray(files.image)
              ? files.image[0]
              : files.image
            : Array.isArray(files.file)
              ? files.file[0]
              : files.file;

        if (stock) product.stock = Number(stock);

        if (uploadedFile) {
          // Delete old image from Cloudinary
          if (product.img) {
            const parts = product.img.split("/");
            const fileName = parts[parts.length - 1].split(".")[0];
            await cloudinary.uploader.destroy(`products/${fileName}`).catch(() => {});
          }

          const filePath = uploadedFile.filepath || uploadedFile.path;
          const normalizedPath = filePath.replace(/\\/g, "/");
          const uploadResult = await cloudinary.uploader.upload(normalizedPath, {
            folder: "products",
          });
          product.img = uploadResult.secure_url;
        }

        // ✅ Update text fields
        if (title) product.title = title;
        if (subtitle) product.subtitle = subtitle;
        if (category) product.category = category;
        if (details) product.details = details;
        if (price) product.price = Number(price);

        await product.save();
        return res.status(200).json(product);
      } catch (error) {
        console.error("PUT error:", error);
        return res.status(500).json({ message: "Failed to update product", error });
      }
    });
  }

  // ---------------- Invalid Method ----------------
  else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

