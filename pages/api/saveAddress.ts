import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // try {
  //   await dbConnect();
  //   const userId = req.query.id; 
  //   console.log("sohil", userId);
  //   if (!userId || typeof userId !== "string") {
  //     return res.status(400).json({ error: "User id is required" });
  //   }
  //   // console.log("lnd mera");
  //   // console.log(userId);

  //   const {firstName,lastName,email,address,apartment,city,state,pincode,phone,} = req.body;

  //   const updatedUser = await User.findByIdAndUpdate(
  //     userId,
  //     {
  //       address: {firstName,lastName,email,phone,address,apartment,city,state,pincode,},
  //     },
  //     { new: true, runValidators: true }
  //   );

  //   if (!updatedUser) {
  //     return res.status(404).json({ error: "User not found" });
  //   }

  //   res.status(200).json({ success: true, user: updatedUser });
  // } catch (error: any) {
  //   res.status(500).json({ success: false, error: error.message });
  // }
  try {
  await dbConnect();
  const userId = req.query.id;

  console.log("User ID received:", userId);

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "User id is required" });
  }

  const user = await User.findById(userId);
  console.log("User found:", user);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { firstName, lastName, email, address, apartment, city, state, pincode, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      address: { firstName, lastName, email, phone, address, apartment, city, state, pincode },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, user: updatedUser });
} catch (error: any) {
  res.status(500).json({ success: false, error: error.message });
}

}
