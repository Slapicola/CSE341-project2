const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movies");
const validation = require("../middleware/validation");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", movieController.getAllMovies);
router.post(
  "/",
  isAuthenticated,
  validation.movieValidationRules(),
  validation.movieValidate,
  movieController.createMovie
);
router.put(
  "/:id",
  isAuthenticated,
  validation.movieValidationRules(),
  validation.movieValidate,
  movieController.updateMovie
);
router.delete("/:id", isAuthenticated, movieController.deleteMovie);

module.exports = router;
