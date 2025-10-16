import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const orders = await Order.find({ userId: id })
        .populate("userId", "firstName lastName email") 
        .populate("items.productId", "title price img")    
        .sort({ createdAt: -1 });                      

        
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
