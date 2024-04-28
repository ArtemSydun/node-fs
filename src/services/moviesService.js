const { Movie } = require('../model/movieModel');

const getMovies = async () => {
  try {
    const moviesList = await Movie.find();
    return moviesList;
  } catch (err) {
    throw err;
  }
};

const getMovieById = async (id) => {
  try {
    const movieById = await Movie.findById(id);

    return movieById;
  } catch (err) {
    throw err;
  }
};


module.exports = {
  getMovies,
  getMovieById,
};
