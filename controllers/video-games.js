const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAllGames = async (req, res) => {
  const gameResults = await mongodb
    .getDatabase()
    .db()
    .collection("Video Games")
    .find();
  gameResults.toArray().then((games) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(games);
  });
};

const createGame = async (req, res) => {
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
};

module.exports = { getAllGames, createGame };
