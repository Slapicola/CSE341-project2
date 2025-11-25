const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
// This is the basic session initilization
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  // );
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, OPTIONS"
  // );
  next();
});
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://cs361-project4-e75b.onrender.com",
    ], // or whatever your frontend is
    credentials: true, // allows cookies to be sent
  })
);

// app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"] }));
// app.use(cors({ origin: "*" }));

app.use("/", require("./routes"));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findorCreate({ githubId: profile.id }, function(err, user) {
      return done(null, profile);

      //})
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    // session: false,
  }),
  (req, res) => {
    // req.session.user = req.user;
    res.redirect("/");
  }
);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(
        `Database is connected and node is listening on port ${port}... `
      );
    });
  }
});
