const { User } = require("../model/userModel.js");
const fs = require('fs/promises');
const path = require('path');

const {
  ConflictException,
} = require("../helpers/exceptions.js");
const { finalAvatarsFolder } = require('../helpers/constants.js');

const getAllFavorites = async (email) => {
  const user = await User.findOne({ email }).populate("favoriteMovies");

  return user.favoriteMovies;
};

const addToFavorites = async (email, movieId) => {
  const user = await User.findOne({ email });

  const isMovieAlreadyAdded = user.favoriteMovies.some((favMovieId) =>
    favMovieId.equals(movieId)
  );

  if (isMovieAlreadyAdded) {
    throw new ConflictException("Film already in favorites");
  }

  await User.updateOne(
    { _id: user.id },
    { $push: { favoriteMovies: movieId } }
  );

  const updatedUser = await User.findById(user._id).populate("favoriteMovies");
  return updatedUser.favoriteMovies;
};

const clearFavorites = async (email) => {
  const user = await User.findOne({ email });

  await User.updateOne({ _id: user.id }, { $set: { favoriteMovies: [] } });

  return user.favoriteMovies;
};

const getUserInfo = async (email) => {
  const userInfo = User.findOne({ email });

  return userInfo;
};

const saveUserAvatar = async (file, userId) => {
  const pathName = file.path;
  const fileExtension = file.originalname.split('.').pop();
  const newAvatar = `${userId}.${fileExtension}`;

  try {
    await fs.rename(pathName, path.join(`${finalAvatarsFolder}`, newAvatar));
  } catch (error) {
    await fs.unlink(pathName);
    throw error;
  }

  return path.join(process.env.AVATARS_FOLDER, newAvatar).replace('\\', '/');
};


const updateAvatar = async (userId, file) => {
  const avatarURL = await saveUserAvatar(file, userId);
  await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
  return avatarURL;
};


module.exports = {
  clearFavorites,
  getUserInfo,
  addToFavorites,
  getAllFavorites,
  saveUserAvatar,
  updateAvatar
};
