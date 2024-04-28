const express = require("express");
const { getAllMovies, getMovie } = require('../controllers/moviesController');

const router = express.Router();


router.get("/", getAllMovies);

router.get("/:id", getMovie);

module.exports = router;
