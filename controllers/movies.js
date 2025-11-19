const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAllMovies = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const movieResults = await mongodb
      .getDatabase()
      .db()
      .collection("Movies")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movieResults);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const movie = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      director: req.body.director,
      productionCompany: req.body.productionCompany,
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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const movieId = new objectId(req.params.id);
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
      .replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while updating the movie.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const movieId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Movies")
      .deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while deleting the movie.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
