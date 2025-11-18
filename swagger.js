const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Movies and Games API",
    description: "An API for movies and games",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//This will generate Swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
