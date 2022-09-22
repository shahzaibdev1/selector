import nodemailer from "nodemailer";
import { SMTP_EMAIL, SMTP_HOST, SMTP_PASS, SMTP_PORT } from "./config.js";

const mailConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASS,
  },
};

export const sendMail = async ({ html, subject, to, from }) => {
  try {
    let transporter = nodemailer.createTransport(mailConfig);

    // send mail to this user
    return await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });
  } catch (error) {
    console.log(error);

    return { isOk: false, message: error.message };
  }
};
