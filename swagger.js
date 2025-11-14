const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Movies API",
    description: "An API for movies",
  },
  host: "localhost:5000",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//This will generate Swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
