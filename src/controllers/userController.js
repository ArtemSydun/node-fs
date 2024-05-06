const { statusCode } = require("../helpers/constants.js");

const {
  getUserInfo,
  addToFavorites,
  getAllFavorites,
  clearFavorites,
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

module.exports = {
  getUserInfoController,
  addToFavoritesController,
  getUserFavoriteMoviesController,
  clearUserFavoritesController,
};
