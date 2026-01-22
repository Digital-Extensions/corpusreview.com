import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, organization, message } = req.body as ContactFormData;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const { error } = await resend.emails.send({
      from: "Corpus Review <noreply@license.digital-extensions.com>",
      to: ["contact@corpusreview.com"],
      replyTo: email,
      subject: `Contact form: ${name}${organization ? ` (${organization})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "Not provided"}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
