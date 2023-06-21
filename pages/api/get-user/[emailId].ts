import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailId } = req.query;
  try {
    const [rows] = await db.query("SELECT * FROM user where email = ?", [
      emailId,
    ]);
    res.status(200).json(rows);
    // db.end();
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
