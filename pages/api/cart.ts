import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  title: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartItemSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  try {
    switch (method) {
      case "GET": {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const cartItems = await Cart.find({ userId });
        return res.status(200).json({ cart: cartItems });
      }
      case "POST": {
        const { userId, products } = req.body;
        console.log("🛒 CART POST API CALLED:", req.body);
        if (!userId || !Array.isArray(products))
          return res.status(400).json({ message: "UserId and products array required" });

        for (const p of products) {
          const { productId, title, price, image, quantity } = p;
          const existingItem = await Cart.findOne({ userId, productId });
          if (existingItem) {
            existingItem.quantity += quantity || 1;
            await existingItem.save();
          } else {
            const newItem = new Cart({ userId, productId, title, price, image, quantity: quantity || 1 });
            await newItem.save();
          }
        }

        const updatedCart = await Cart.find({ userId });
        return res.status(200).json({ message: "Cart updated", cart: updatedCart });
      }
      case "DELETE": {
        const { userId, productId } = req.query;
        if (!userId || !productId)
          return res.status(400).json({ message: "UserId and productId required" });

        await Cart.findOneAndDelete({ userId, productId });
        const updatedCart = await Cart.find({ userId });
        return res.status(200).json({ message: "Item removed", cart: updatedCart });
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Cart API Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
