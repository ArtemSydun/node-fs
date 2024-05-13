const { statusCode } = require("../helpers/constants.js");
const { getMovies, getMovieById, getMovieAggregation } = require("../services/moviesService.js");

const getAllMovies = async (req, res) => {
  const { page = 1, limit = 10, sortBy, sortOrder, name } = req.query;
  let query = {};
  if (name) {
    query = { name: { $regex: new RegExp(name, "i") } };
  }

  const movies = await getMovies(
    query,
    parseInt(page),
    parseInt(limit),
    sortBy,
    sortOrder
  );

  res.status(statusCode.OK).send({
    items: movies,
    meta: {
      page: page,
      limit: limit,
      totalItems: movies.length,
    },
  });
};

const getMovie = async (req, res, next) => {
  const { id } = req.params;
  const movieById = await getMovieById(id);

  if (!movieById) {
    return next({
      status: statusCode.NOT_FOUND,
      message: `Not found movie with id ${id}`,
    });
  }

  res.status(statusCode.OK).send(movieById);
};

const getMovieStats = async (req, res, next) => {
  const movieStats = await getMovieAggregation();
  res.json(movieStats);
};

module.exports = {
  getAllMovies,
  getMovie,
  getMovieStats
};
