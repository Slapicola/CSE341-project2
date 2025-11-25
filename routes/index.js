const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//   res.send("Testing, testing, 1 2 3");
// });

router.use("/movies", require("./movies"));
router.use("/games", require("./video-games"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      console.log("Session destroyed.");
      res.clearCookie("connect.sid", { path: "/" });
      res.redirect("/");
    });
  });
});

module.exports = router;
