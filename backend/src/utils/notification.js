// utils/notification.js
import nodemailer from "nodemailer";
import twilio from "twilio";

// Email
export const sendEmail = async (clientId, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "your@gmail.com", pass: "password" },
  });
  await transporter.sendMail({
    from: "crm@company.com",
    to: "client@email.com", // lookup clientId in DB
    subject: "Proposal/Agreement Document",
    text: "Please find attached.",
    attachments: [{ filename: pdfPath.split("/").pop(), path: pdfPath }],
  });
};

// WhatsApp
export const sendWhatsApp = async (clientId, pdfPath) => {
  const client = twilio("TWILIO_SID", "TWILIO_AUTH_TOKEN");
  await client.messages.create({
    from: "whatsapp:+14155238886",
    to: "whatsapp:+91XXXXXXXXXX", // client mobile
    body: "Your Proposal/Agreement document is ready",
    mediaUrl: [`http://your-server.com/${pdfPath}`],
  });
};
