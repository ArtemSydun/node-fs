const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestException } = require('./exceptions');

const generateToken = (userId, userEmail) => { 
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  const token = jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
  return token;
}

const compareUserPassword = async (user, password) => { 
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!user || !isPasswordValid) {
    throw new BadRequestException('Invalid credentials');
  }
}

module.exports = { generateToken, compareUserPassword }
