import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, email, name } = req.body;

  if (!message && !email && !name) {
    res.status(400).json({ error: "Name, Message and email are required" });
    return;
  }

  try {
    if (req.method === "POST") {
      const recipients = [
        "krishna@eflairwebtech.com",
        "znaneswar@eflairwebtech.com",
        "bhadra@eflairwebtech.com",
      ];
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "krishnasingh200113@gmail.com",
          pass: "iagcqilfxigekhtw",
        },
      });

      const mailOption = {
        from: `${email}`,
        to: recipients.join(", "),
        subject: `New mail from ${email}`,
        text: `
        enquiry from: ${name}
        enquiry: ${message}`,
      };

      transporter.sendMail(mailOption, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("mail send");
        }
      });

      res.send("success");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
