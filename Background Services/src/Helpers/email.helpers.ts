import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { mailConfig } from "../Interface/mail_config";
dotenv.config();

function createTransporter(config: mailConfig) {
  let transporter = nodemailer.createTransport(config);

  return transporter;
}

let configurations: mailConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.USER as string,
    pass: process.env.PASS as string,
  },
};

export const sendMail = async (messageOption: any) => {
  const transporter = await createTransporter(configurations);

  await transporter.verify();

  await transporter.sendMail(messageOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
};
