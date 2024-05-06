const { User } = require("../model/userModel.js");

const {
  ConflictException,
} = require("../helpers/exceptions.js");

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


module.exports = {
  clearFavorites,
  getUserInfo,
  addToFavorites,
  getAllFavorites,
};
