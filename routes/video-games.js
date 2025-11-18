const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");

const gameController = require("../controllers/video-games");

router.get("/", gameController.getAllGames);
router.post(
  "/",
  validation.gameValidationRules(),
  validation.gameValidate,
  gameController.createGame
);
router.put(
  "/:id",
  validation.gameValidationRules(),
  validation.gameValidate,
  gameController.updateGame
);
router.delete("/:id", gameController.deleteGame);

module.exports = router;
