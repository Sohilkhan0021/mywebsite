import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Cart, { ICart } from "@/models/Cart";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "UserId required" });
      }

      try {
        let cart = await Cart.findOne({ userId: userId.toString().trim() });
        console.log("Fetched cart:", cart);

        if (!cart) {
          return res
            .status(201)
            .json({ cart: { userId: userId.toString().trim(), products: [] } });
        }

        return res.status(200).json({
          cart: { userId: userId.toString().trim(), products: cart.products },
        });
      } catch (err) {
        console.error("GET cart error:", err);
        return res.status(500).json({ message: "Server error" });
      }
    }

    case "POST": {
      const { userId, product } = req.body;
      if (!userId || !product) {
        return res.status(400).json({ message: "UserId and product required" });
      }

      let cart = await Cart.findOne({ userId: userId.toString().trim() });

      if (!cart) {
        cart = new Cart({ userId: userId.toString().trim(), products: [] });
      }
      const existingIndex = cart.products.findIndex(
        (p: { productId: any }) => p.productId === product.id
      );

      if (existingIndex !== -1) {
        cart.products[existingIndex].quantity += product.quantity || 1;
      } else {
        cart.products.push({
          productId: product.id,
          title: product.title,
          subtitle: product.subtitle || "",
          img: product.img,
          price: product.price,
          quantity: product.quantity || 1,
          stock: product.stock,
        });
      }

      await cart.save();
      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart });
    }

    case "DELETE": {
      const { userId, productId } = req.query;
      if (!userId || !productId)
        return res
          .status(400)
          .json({ message: "UserId and productId required" });

      const cart = await Cart.findOne({ userId: userId.toString().trim() });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      cart.products = cart.products.filter(
        (p: { productId: string }) => p.productId !== productId.toString()
      );
      await cart.save();
      return res.status(200).json({ message: "Product removed", cart });
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
