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
        genre: "$_id",
        movies: 1,
        totalViews: 1,
        averageRating: 1,
        count: 1
      }
    },
    {
      $project: {
        _id: 0,
        genre: 1,
        movies: 1,
        totalViews: 1,
        averageRating: {
          $round: [{ $avg: "$averageRating" }, 2] // Round averageRating to 2 decimal places
        },
        count: 1,
      }
    }
  ]);

  return movieStats;
};
module.exports = {
  getMovies,
  getMovieById,
  getMovieAggregation,
};
