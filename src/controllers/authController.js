const { statusCode } = require("../helpers/constants.js");

const {
  registerUser,
  loginUser,
  verifyUser,
} = require("../services/authService.js");

const registerUserController = async (req, res) => {
  const userInfo = req.body;
  await registerUser(userInfo);
  res.status(statusCode.CREATED).json({ status: "success" });
};

const verifyUserController = async (req, res) => {
  const code = req.params.code;
  console.log(req.params);
  const token = await verifyUser(code);
  res.status(statusCode.CREATED).json({ status: "success", token });
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  sendForgotPassword(email);
  res.status(statusCode.OK).json({ status: "success" });
};

const loginUserController = async (req, res) => {
  const body = req.body;
  const token = await loginUser(body);
  res.status(statusCode.OK).json({ status: "success", token });
};



module.exports = {
  registerUserController,
  loginUserController,
  verifyUserController,
  forgotPasswordController,
};
