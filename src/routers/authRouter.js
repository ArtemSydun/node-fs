const express = require("express");
const { asyncWrapper } = require('../helpers/apiWrapper.js');

const router = express.Router();

const {
  registerUserController,
  loginUserController,
  getUserInfoController,
  addToFavoritesController,
  getUserFavoriteMoviesController,
  clearUserFavoritesController,
  verifyUserController
} = require("../controllers/authController.js");

const {
  validateCreateUser,
  validateCredentialsUser,
} = require('../middlewares/authValidation.js');

const { authGuard } = require('../middlewares/authGuard.js');

router.get('/verify/:code', asyncWrapper(verifyUserController));
router.get('/current', authGuard, asyncWrapper(getUserInfoController))
router.get('/favorites', authGuard, asyncWrapper(getUserFavoriteMoviesController))
router.post('/addToFavorites', authGuard, asyncWrapper(addToFavoritesController))
router.post('/clearFavorites', authGuard, asyncWrapper(clearUserFavoritesController))
router.post('/signUp', validateCreateUser, asyncWrapper(registerUserController));
router.post('/signIn', validateCredentialsUser, asyncWrapper(loginUserController));

module.exports = router;
