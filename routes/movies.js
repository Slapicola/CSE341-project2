const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movies");
const validation = require("../middleware/validation");

router.get("/", movieController.getAllMovies);
router.post(
  "/",
  validation.movieValidationRules(),
  validation.movieValidate,
  movieController.createMovie
);
router.put(
  "/:id",
  validation.movieValidationRules(),
  validation.movieValidate,
  movieController.updateMovie
);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
