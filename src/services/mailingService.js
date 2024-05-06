const nodemailer = require("nodemailer");
const { ServiceUnavailableException } = require("../helpers/exceptions");

const PORT = process.env.PORT;
const SENDER = process.env.EMAIL_SENDER;
const EMAIL_PASSWORD = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: SENDER,
    pass: EMAIL_PASSWORD,
  },
});

const send = async (config) => {
  try {
    const { from = SENDER, to, subject, text, html } = config;
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error(error.message);
    throw new ServiceUnavailableException(error.message);
  }
};

const sendVerificationEmail = async (email, code) => {
  try {
    const verificationLink = `http://localhost:${PORT}/auth/verify/${code}`;
    const html = `<p>To verify your email please click on <a href="${verificationLink}">link</a></p>`;

    await send({
      from: SENDER,
      to: email,
      text: "Verify your email",
      subject: "Email verification",
      html,
    });
  } catch (error) {
    console.log(error);
    throw new ServiceUnavailableException(error?.response?.body);
  }
};

module.exports = { sendVerificationEmail };
