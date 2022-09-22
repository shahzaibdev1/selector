import dotenv from "dotenv";
dotenv.config();

export const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "$2a$10$hWKnkC7.EsHG/9BfPSe.EE1QNJfJldb4W5uxxYx.8/T3UohMOgOeCY";

export const SMTP_EMAIL = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;

export const validateReferrence = (model, id, name) => {
  return new Promise((resolve, reject) => {
    model.findOne({ _id: id }, (err, result) => {
      if (result) {
        return resolve(true);
      } else
        return reject(
          new Error(`${name} referrence does not exisit against this id`)
        );
    });
  });
};

export const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
