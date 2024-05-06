const { statusCode } = require("../helpers/constants.js");

const {
  registerUser,
  loginUser,
  verifyUser,
  verifyUserAgain,
  resetUserPassword,
} = require("../services/authService.js");
const { sendForgotPassword } = require('../services/mailingService.js');

const registerUserController = async (req, res) => {
  const userInfo = req.body;
  await registerUser(userInfo);
  res.status(statusCode.CREATED).json({ status: "success" });
};

const verifyUserController = async (req, res) => {
  const code = req.params.code;
  const token = await verifyUser(code);
  res.status(statusCode.CREATED).json({ status: "success", token });
};

const resendUserVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(statusCode.BAD_REQUEST).json({ message: "missing required field 'email' "})
  }

  await verifyUserAgain(email);
  res.status(statusCode.CREATED).json({ status: "Verification link send again" });
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const newPassword = await resetUserPassword(email);
  await sendForgotPassword(email, newPassword);

  res.status(statusCode.OK).json({ status: "New password sent to your email" });
};

const loginUserController = async (req, res) => {
  const body = req.body;
  const token = await loginUser(body);
  res.status(statusCode.OK).json({ status: "Successful login", token });
};



module.exports = {
  registerUserController,
  loginUserController,
  verifyUserController,
  resendUserVerification,
  forgotPasswordController,
};
