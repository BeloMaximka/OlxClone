import nodemailer from "nodemailer";
import { environmentVariables } from "../../../../config/environment-variables.ts";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: environmentVariables.nodemailer.user,
    pass: environmentVariables.nodemailer.password,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string
) {
  await transporter.sendMail({
    from: environmentVariables.nodemailer.user,
    to,
    subject,
    html: htmlContent,
  });
}
