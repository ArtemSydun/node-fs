const express = require("express");
const { asyncWrapper } = require('../helpers/apiWrapper.js');

const router = express.Router();

const {
  getUserInfoController,
  addToFavoritesController,
  getUserFavoriteMoviesController,
  clearUserFavoritesController,
} = require("../controllers/userController.js");


const { authGuard } = require('../middlewares/authGuard.js');

router.get('/current', authGuard, asyncWrapper(getUserInfoController))
router.get('/favorites', authGuard, asyncWrapper(getUserFavoriteMoviesController))
router.post('/addToFavorites', authGuard, asyncWrapper(addToFavoritesController))
router.post('/clearFavorites', authGuard, asyncWrapper(clearUserFavoritesController))

module.exports = router;
