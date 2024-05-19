const { statusCode } = require("../helpers/constants.js");

const {
  getUserInfo,
  addToFavorites,
  getAllFavorites,
  clearFavorites,
  updateAvatar,
} = require("../services/userService.js");

const getUserInfoController = async (req, res) => {
  const { email } = req.body;
  const userInfo = await getUserInfo(email);
  res.status(statusCode.OK).json(userInfo);
};

const addToFavoritesController = async (req, res) => {
  const { email, movieId } = req.body;

  const updatedFavorites = await addToFavorites(email, movieId);
  res.status(statusCode.OK).send(updatedFavorites);
};

const getUserFavoriteMoviesController = async (req, res) => {
  const { email } = req.body;

  const favoriteMovies = await getAllFavorites(email);

  res.status(statusCode.OK).json(favoriteMovies);
};

const clearUserFavoritesController = async (req, res) => {
  const { email } = req.body;

  await clearFavorites(email);

  res.status(statusCode.OK).send({ message: "success" });
};

const updateUserAvatarController = async (req, res) => {
  const id = req.user._id;
  const avatarURL = await updateAvatar(id, req.file);

  res.json({ avatarURL });
};

module.exports = {
  getUserInfoController,
  addToFavoritesController,
  getUserFavoriteMoviesController,
  clearUserFavoritesController,
  updateUserAvatarController,
};
