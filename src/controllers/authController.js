const { statusCode } = require("../helpers/constants.js");
const {
  registerUser,
  loginUser,
  getUserInfo,
  addToFavorites,
  getAllFavorites,
  clearFavorites,
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
  registerUserController,
  loginUserController,
  getUserInfoController,
  addToFavoritesController,
  getUserFavoriteMoviesController,
  clearUserFavoritesController,
  verifyUserController,
  forgotPasswordController,
};
