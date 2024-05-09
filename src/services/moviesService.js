const { Movie } = require("../model/movieModel");

const getMovies = async (query, page, limit, sortBy, sortOrder) => {
  let sortCriteria = {};
  if (sortBy) {
    sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    sortCriteria.createdAt = -1;
  }

  const movies = await Movie.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sortCriteria);

  return movies;
};

const getMovieById = async (id) => {
  try {
    const movieById = await Movie.findById(id);

    return movieById;
  } catch (err) {
    throw err;
  }
};

const getMovieAggregation = async () => {
  const movieStats = await Movie.aggregate([
    { $match: { year: { $gt: 1994 } } },

    {
      $group: {
        _id: "$genre",
        movies: { $push: "$$ROOT" },
        totalViews: { $sum: "$views" },
        averageRating: { $avg: { $toDecimal: "$rating" } },
      }
    },
    
    {
      $addFields: {
        count: { $size: "$movies" }
      }
    },
    {
      $project: {
        _id: 0,
        genre: "$_id",
        movies: 1,
        totalViews: 1,
        averageRating: {
          $concat: [
            { $toString: { $round: [{ $avg: "$averageRating" }, 2] } },
          ]
        },
        count: 1
      }
    },
  ]);

  return { items: movieStats };
};
module.exports = {
  getMovies,
  getMovieById,
  getMovieAggregation,
};
