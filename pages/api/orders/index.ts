// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "@/lib/mongodb";
// import Order from "@/models/Order"; 
// import User from "@/models/User"; 
// import Product from "@/models/Product"; 

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   if (req.method === "POST") {
//     try {
//       const { userId, items, totalAmount, paymentMethod } = req.body;
//         console.log("sohil11", userId,totalAmount,paymentMethod, items);
//       if (!userId || !items || !totalAmount || !paymentMethod) {
//         return res.status(400).json({ success: false, message: "Missing required fields" });
//       }

//       const order = await Order.create({
//         userId,
//         items,
//         totalAmount,
//         paymentMethod,
//         status: "pending",
//       });

//       return res.status(201).json({ success: true, order });
//     } catch (error) {
//       console.error("Error creating order:", error);
//       return res.status(500).json({ success: false, message: "Failed to create order" });
//     }
//   } else if(req.method === "GET") {
//     try {
//       const orders = await Order.find()
//         // .populate("userId", "name email phonenumber address") 
//         .populate("userId", "firstName lastName email phone address")
//         .populate("items.productId", "title price img "); 
//       res.status(200).json({ success: true, orders });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Failed to fetch orders" });
//     }
//   } else {
//     res.status(405).json({ success: false, message: "Method not allowed" });
//   }
// }

















import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    if (!mongoose.models.User) mongoose.model("User", User.schema);
    if (!mongoose.models.Product) mongoose.model("Product", Product.schema);
    if (!mongoose.models.Order) mongoose.model("Order", Order.schema);

    if (req.method === "POST") {
      const { userId, items, totalAmount, paymentMethod } = req.body;

      if (!userId || !items || !totalAmount || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const order = await Order.create({
        userId,
        items,
        totalAmount,
        paymentMethod,
        status: "pending",
      });

      return res.status(201).json({ success: true, order });
    }

    if (req.method === "GET") {
      const orders = await Order.find()
        .populate("userId", "firstName lastName email phone address")
        .populate("items.productId", "title price img");

      return res.status(200).json({ success: true, orders });
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("Error in /api/orders:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
