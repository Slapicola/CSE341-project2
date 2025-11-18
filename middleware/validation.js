const { body, validationResult } = require("express-validator");

const movieValidationRules = () => {
  return [
    body("title")
      .isString()
      .isLength({ min: 1, max: 200 })
      .withMessage("Title must be a string between 1 and 200 characters."),
    body("releaseYear").isInt().withMessage("Year must be an integer."),
    body("director")
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(
            (name) => typeof name === "string" && name.trim().length > 0
          );
        }
        return typeof value === "string" && value.trim().length > 0;
      })
      .withMessage("Director must be either a string or an array."),
    body("productionCompany")
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(
            (company) =>
              typeof company === "string" && company.trim().length > 0
          );
        }
        return typeof value === "string" && value.trim().length > 0;
      })
      .withMessage("Production Company must be an string or an array."),
    body("mainCast")
      .isArray({ min: 1 })
      .custom((arr) => arr.every((actor) => typeof actor === "string"))
      .withMessage("Main Cast must be an array."),
    body("plot")
      .isString()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Plot must be a string between 10 and 1000 characters."),
    body("runTimeMinutes")
      .isInt({ min: 1, max: 600 })
      .withMessage("runTimeMinutes must be an integer between 1 and 600."),
  ];
};

const movieValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

const gameValidationRules = () => {
  return [
    body("title")
      .isString()
      .isLength({ min: 1, max: 200 })
      .withMessage("Title must be a string between 1 and 200 characters."),
    body("releaseYear").isInt().withMessage("Year must be an integer."),
    body("developer")
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(
            (name) => typeof name === "string" && name.trim().length > 0
          );
        }
        return typeof value === "string" && value.trim().length > 0;
      })
      .withMessage("Developer must be either a string or an array."),
    body("platforms")
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(
            (platforms) =>
              typeof platforms === "string" && platforms.trim().length > 0
          );
        }
        return typeof value === "string" && value.trim().length > 0;
      })
      .withMessage("Platforms must be an string or an array."),
    body("genre")
      .isArray({ min: 1 })
      .custom((arr) => arr.every((genre) => typeof genre === "string"))
      .withMessage("Genre must be an array."),
    body("modes")
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(
            (modes) => typeof modes === "string" && modes.trim().length > 0
          );
        }
        return typeof value === "string" && value.trim().length > 0;
      })
      .withMessage("Modes must be an string or an array."),
    body("priceUSD")
      .isFloat({ min: 1, max: 600 })
      .withMessage("priceUSD must be a a number between 1 and 600."),
  ];
};

const gameValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  movieValidationRules,
  movieValidate,
  gameValidationRules,
  gameValidate,
};
