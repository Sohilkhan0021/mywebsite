// import type { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcryptjs";
// import dbConnect from "../../lib/mongodb";
// import { sendWelcomeEmail } from "../../lib/mailer";
// import User from "../../models/User"; 

// const ADMIN_EMAILS = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   await dbConnect();

//   try {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !email || !password) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";

//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await sendWelcomeEmail(email, firstName);
//     return res
//       .status(201)
//       .json({ message: "User created successfully, email sent", user: newUser });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// }



























import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../lib/mongodb";
import { sendWelcomeEmail } from "../../lib/mailer";
import User from "../../models/User";

const ADMIN_EMAILS = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { firstName, lastName, email, password, otp } = req.body;

    if (!firstName || !email || !password || !otp) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await sendWelcomeEmail(email, firstName);

    return res.status(201).json({
      message: "Account created successfully and email verified",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
