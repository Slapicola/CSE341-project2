const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAllMovies = async (req, res) => {
  const movieResults = await mongodb
    .getDatabase()
    .db()
    .collection("Movies")
    .find();
  movieResults.toArray().then((movies) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies);
  });
};

const createMovie = async (req, res) => {
  const movie = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    director: req.body.director,
    productionCompnay: req.body.productionCompnay,
    mainCast: req.body.mainCast,
    plot: req.body.plot,
    runTimeMinutes: req.body.runTimeMinutes,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Movies")
    .insertOne(movie);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while creating the movie.");
  }
};

module.exports = { getAllMovies, createMovie };
