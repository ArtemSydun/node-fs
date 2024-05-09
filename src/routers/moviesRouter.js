const express = require("express");
const { getAllMovies, getMovie, getMovieStats } = require('../controllers/moviesController');
const { asyncWrapper } = require('../helpers/apiWrapper');

const router = express.Router();


router.get("/", asyncWrapper(getAllMovies));

router.get("/aggregation", asyncWrapper(getMovieStats));

router.get("/:id", asyncWrapper(getMovie));


module.exports = router;
