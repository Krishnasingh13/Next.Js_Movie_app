import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailId } = req.query;
  const { firstName, lastName } = req.body;

  if (!firstName && !lastName) {
    res.status(400).json({ error: "FirstName and LastName are required" });
    return;
  }

  try {
    await db.query(
      "UPDATE user SET firstName = ?, lastName = ? where email = ?",
      [firstName, lastName, emailId]
    );
    res.status(200).json({ message: "User updated successfully" });
    // db.end();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
