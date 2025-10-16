import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dbConnect from "../../lib/mongodb";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, 
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);


const ADMIN_EMAILS = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const role = ADMIN_EMAILS.includes(user.email) ? "admin" : user.role || "user";

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id.toString(),
        name: user.firstName || user.email.split("@")[0],
        email: user.email,
        role,
      },
      token: "dummy-token",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
