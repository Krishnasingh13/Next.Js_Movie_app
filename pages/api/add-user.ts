import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, firstName, lastName } = req.body;

  if (!email && !firstName && !lastName) {
    res
      .status(400)
      .json({ error: "Email, FirstName and LastName are required" });
    return;
  }

  try {
    await db.query(
      "INSERT INTO user (email,firstName,lastName) VALUES (?,?,?)",
      [email, firstName, lastName]
    );
    res.status(200).json({ message: "User created successfully" });
    // db.end()
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
