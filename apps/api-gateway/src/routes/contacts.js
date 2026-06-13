import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Configure SMTP transport for NodeMailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER || "fixmylapquick@gmail.com",
    pass: process.env.SMTP_PASS, // Needs Google App Password configured in .env
  },
});

// Submit Contact Message
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Save to Database
    const contactMessage = await Contact.create({ name, email, message });

    // Try sending email to admin
    if (process.env.SMTP_PASS) {
      try {
        const mailOptions = {
          from: `"FixMyLap Contact" <${process.env.SMTP_USER || "fixmylapquick@gmail.com"}>`,
          to: "fixmylapquick@gmail.com",
          subject: `New Contact Inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
              <h2 style="color: #25B425; border-bottom: 2px solid #25B425; padding-bottom: 10px;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <blockquote style="background: white; padding: 15px; border-left: 5px solid #25B425; margin: 10px 0;">
                ${message.replace(/\n/g, "<br/>")}
              </blockquote>
              <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
              <p style="font-size: 11px; color: #666;">This email was automatically generated from FixMyLap contact form.</p>
            </div>
          `,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email notification sent to fixmylapquick@gmail.com for submission by ${name}`);
      } catch (mailError) {
        console.error(`Failed to send email notification: ${mailError.message}`);
        // Do not crash the response even if mailing fails, since DB saved successfully
      }
    } else {
      console.log("SMTP_PASS is not configured in .env. Skipping email notification.");
    }

    const response = {
      id: contactMessage._id,
      name: contactMessage.name,
      email: contactMessage.email,
      message: contactMessage.message,
      date: contactMessage.createdAt,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Contact Messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    const mapped = messages.map((m) => ({
      id: m._id,
      name: m.name,
      email: m.email,
      message: m.message,
      date: m.createdAt,
    }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Contact Message
router.delete("/:id", async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
