const { User } = require("../model/userModel.js");
const {
  BadRequestException,
  ConflictException,
} = require("../helpers/exceptions.js");
const { createVerificationCode } = require("./verificationService.js");
const { sendVerificationEmail } = require("./mailingService.js");
const { Verification } = require("../model/verificationModel.js");
const {
  generateToken,
  compareUserPassword,
} = require("../helpers/authFunctions.js");

const registerUser = async ({ firstName, lastName, email, password }) => {
  const existedUser = User.findOne({ email });
  if (existedUser.email) {
    throw new ConflictException("User with such email already exists");
  }

  const newUser = new User();
  const newVerificationCode = await createVerificationCode(newUser.id);

  Object.assign(newUser, {
    firstName,
    lastName,
    email,
    password,
  });

  await sendVerificationEmail(email, newVerificationCode.code);
  await newVerificationCode.save();
  await newUser.save();
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).exec();
  await compareUserPassword(user, password);
  return generateToken(user.id, user.email);
};

const verifyUser = async (code) => {
  const verificationCode = await Verification.findOne({ code, active: true });

  if (!verificationCode) {
    throw new BadRequestException("Invalid verification code");
  }

  const userToVerify = await User.findById(verificationCode.userId);

  if (!userToVerify) {
    throw new BadRequestException("User to verify doesn`t exist");
  }

  await userToVerify.updateOne({ activated: true });
  await verificationCode.deleteOne();

  return generateToken(userToVerify.id, userToVerify.email);
};

const verifyUserAgain = async (email) => {
  const userToVerify = await User.findOne({ email });

  if (!userToVerify) {
    throw new ConflictException("User to verify doesn't exist");
  }

  if (userToVerify.activated) {
    throw new ConflictException("User is already verified");
  }

  let verificationCode = await Verification.findOne({
    userId: userToVerify._id,
  });

  if (!verificationCode) {
    verificationCode = await createVerificationCode(userToVerify._id);
    await verificationCode.save();
  }

  await sendVerificationEmail(email, verificationCode.code);
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  verifyUserAgain,
};
