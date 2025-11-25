const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const { isAuthenticated } = require("../middleware/authenticate");

const gameController = require("../controllers/video-games");

router.get("/", gameController.getAllGames);
router.post(
  "/",
  isAuthenticated,
  validation.gameValidationRules(),
  validation.gameValidate,
  gameController.createGame
);
router.put(
  "/:id",
  isAuthenticated,
  validation.gameValidationRules(),
  validation.gameValidate,
  gameController.updateGame
);
router.delete("/:id", isAuthenticated, gameController.deleteGame);

module.exports = router;
