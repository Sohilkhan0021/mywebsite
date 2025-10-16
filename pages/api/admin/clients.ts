import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Address from "@/models/Address";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const users = await User.find();
    const clientsWithDetails = await Promise.all(
      users.map(async (user) => {
        const addresses = await Address.find({ userId: user._id });
        const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
        return {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          country: user.country,
          addresses,
          orders,
        };
      })
    );
    res.status(200).json(clientsWithDetails);
  } catch (error) {
    console.error("Failed to fetch clients with details", error);
    res.status(500).json({ error: "Failed to fetch clients with details" });
  }
}
