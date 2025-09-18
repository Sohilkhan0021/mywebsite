import dbConnect from '../../lib/mongodb';
import Item from '../../model/Item';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const items = await Item.find({});
    return res.status(200).json(items);
  }

  if (req.method === "POST") {
    try {
      const newItem = await Item.create(req.body);
      return res.status(201).json(newItem);
    } catch (error) {
      return res.status(400).json({ error: "Failed to create item" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
