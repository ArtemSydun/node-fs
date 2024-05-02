const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../model/userModel.js");
const { BadRequestException, ConflictException } = require("../helpers/exceptions.js");

const registerUser = async ({ firstName, lastName, email, password }) => {
  const existedUser = User.findOne({ email });
  if (existedUser.email) {
    throw new ConflictException("User with such email already exists");
  }

  const newUser = new User();
  Object.assign(newUser, {
    firstName,
    lastName,
    email,
    password,
  });

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

const getUserInfo = async (email) => {
  const userInfo = User.findOne({ email });

  return userInfo;
};

const addToFavorites = async (email, movieId) => {
  const user = await User.findOne({ email });
  
  await User.updateOne(
    { _id: user.id },
    { $push: { favoriteMovies: movieId } }
  );

  const updatedUser = await User.findById(user._id).populate('favoriteMovies');
  return updatedUser.favoriteMovies;
};

const getAllFavorites = async (email) => {
  const user = await User.findOne({ email });

  return user.favoriteMovies;
};

const clearFavorites = async (email) => {
  const user = await User.findOne({ email });

  await User.updateOne(
    { _id: user.id },
    { $set: { favoriteMovies: [] } }
  );  

  return user.favoriteMovies;
};

module.exports = {
  clearFavorites,
  registerUser,
  loginUser,
  getUserInfo,
  addToFavorites,
  getAllFavorites,
};
