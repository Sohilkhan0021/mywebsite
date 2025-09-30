import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { name, email, phone, country, message } = req.body;

  try {
    
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db("anmolji"); 
    await db.collection("contacts").insertOne({
      name,
      email,
      phone,
      country,
      message,
      createdAt: new Date(),
    });
    client.close();

    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Anmol Contact" <${process.env.SMTP_USER}>`,
      to: "sohil0021khan@gmail.com", 
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Country: ${country}
        Message: ${message}
      `,
    });

    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
