const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../model/userModel.js");
const {
  BadRequestException,
  ConflictException,
} = require("../helpers/exceptions.js");
const { createVerificationCode } = require('./verificationService.js');
const { sendVerificationEmail } = require('./mailingService.js');
const { Verification } = require('../model/verificationModel.js');

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

  console.log(email);
  await sendVerificationEmail(email, newVerificationCode);
  await newVerificationCode.save();
  await newUser.save();
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).exec();

  const isPasswordCorrect = bcrypt.compare(password, user.password);

  if (!user || !isPasswordCorrect) {
    throw new BadRequestException("invalid credits");
  }

  const jwtPayload = {
    email: user.email,
    id: user.id,
  };

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  const token = jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  return token;
};

const verifyUser = async (code) => { 
  const verificationCode = await Verification.findOne(code);

  if (!verificationCode) { 
    throw new BadRequestException('Invalid verification code');
  }
  
  const userToVerify = await User.findById(verificationCode.userId);

  if (!userToVerify) { 
    throw new BadRequestException('Invalid verification code');
  }


  await userToVerify.updateOne({ confirmed: true });
  await verificationCode.deleteOne();
  return generateToken(userToVerify.id, userToVerify.email);

}

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
};
