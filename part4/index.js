// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const Blog = require("./models/blog");

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// app.use(express.static("build"));
// app.use(bodyParser.json());
// app.use(requestLogger);

// app.use(express.json());

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const body = request.body;

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   });
//   blog
//     .save()
//     .then((savedBlog) => {
//       response.json(savedBlog.toJSON());
//     })
//     .catch((error) => next(error));
// });

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);
//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return response.status(400).json({ error: error.message });
//   }
//   next(error);
// };

// app.use(errorHandler);

// const PORT = process.env.PORT || 3003;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const app = require("./app"); // the actual Express application
const http = require("http");
const config = require("./utils/configs");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
