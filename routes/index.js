const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Testing, testing, 1 2 3");
});

router.use("/movies", require("./movies"));
router.use("/games", require("./video-games"));

module.exports = router;
