import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await dbConnect();
    const { userId, items, totalAmount, address, paymentId, orderId, status } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: "Invalid order data" });
    }
    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
      address,
      paymentId,
      orderId,
      status: status || "paid",
    });
    console.log("Order saved!", newOrder);

    return res.status(200).json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error("Error saving order:", error);
    return res.status(500).json({ error: "Failed to save order" });
  }
}
