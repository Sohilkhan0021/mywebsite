import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const orders = await Order.find({ status: "paid" });
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const totalClients = await User.countDocuments();

    const totalProducts = await Product.countDocuments();
    const products = await Product.find();
    const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);

    res.status(200).json({
      totalSales,
      totalClients,
      totalProducts,
      totalStock,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
}
