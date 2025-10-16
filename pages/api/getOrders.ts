// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "@/lib/mongodb";
// import Order from "@/models/Order";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   const { userId } = req.query;
//   if (!userId || typeof userId !== "string") {
//     return res.status(400).json({ success: false, message: "userId is required" });
//   }

//   try {
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error fetching orders" });
//   }
// }








import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { userId } = req.query;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ success: false, message: "userId is required" });
  }
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
}
