import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "data/users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!fs.existsSync(usersFile)) return res.status(200).json([]);
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  res.status(200).json(users);
}
