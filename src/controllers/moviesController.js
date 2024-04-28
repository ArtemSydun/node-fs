const { statusCode } = require("../helpers/constants.js");
const {
  getMovies,
  getMovieById,
} = require("../services/moviesService.js");

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await getMovies();

    res.status(statusCode.OK).send(movies);
  } catch (err) {
    next(err)
  }
};


const getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieById = await getMovieById(id);

    if (!movieById) {
      return next({
        status: statusCode.NOT_FOUND,
        message: `Not found movie with id ${id}`,
      });
    }

    res.status(statusCode.OK).send(movieById);
  } catch (err) {
    next(err);
  }
};


module.exports = { 
  getAllMovies,
  getMovie
 };
