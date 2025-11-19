const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAllGames = async (req, res) => {
  //#swagger.tags=["Video Games"]
  try {
    const gameResults = await mongodb
      .getDatabase()
      .db()
      .collection("Video Games")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(gameResults);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createGame = async (req, res) => {
  //#swagger.tags=["Video Games"]
  try {
    const game = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      developer: req.body.developer,
      platforms: req.body.platforms,
      genre: req.body.genre,
      modes: req.body.modes,
      priceUSD: req.body.priceUSD,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Video Games")
      .insertOne(game);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while creating the game.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateGame = async (req, res) => {
  //#swagger.tags=["Video Games"]
  try {
    const gameId = new objectId(req.params.id);
    const game = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      developer: req.body.developer,
      platforms: req.body.platforms,
      genre: req.body.genre,
      modes: req.body.modes,
      priceUSD: req.body.priceUSD,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Video Games")
      .replaceOne({ _id: gameId }, game);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while updating the game.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteGame = async (req, res) => {
  //#swagger.tags=["Video Games"]
  try {
    const gameId = new objectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Video Games")
      .deleteOne({ _id: gameId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while deleting the game.");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllGames, createGame, updateGame, deleteGame };
