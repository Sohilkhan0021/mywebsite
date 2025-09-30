import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { token, password } = req.body;

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db("anmolji");

    const user = await db.collection("users").findOne({ resetToken: token });

    if (!user || !user.resetTokenExpire || user.resetTokenExpire < Date.now()) {
      client.close();
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").updateOne(
      { resetToken: token },
      { $set: { password: hashedPassword }, $unset: { resetToken: "", resetTokenExpire: "" } }
    );

    client.close();
    return res.status(200).json({ message: "Password reset successful!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
