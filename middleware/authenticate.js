const isAuthenticated = (req, res, next) => {
  console.log("req.user:", req.user);
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "You do not have access to this content." });
  }
  next();
};

module.exports = { isAuthenticated };
