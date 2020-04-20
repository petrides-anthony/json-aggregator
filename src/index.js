const express = require("express");
const errorHandler = require("./error-handler");
const latestPostsHandler = require("./latest-posts-handler");
const app = express();

const port = 8080;

app.get("/latest-posts", latestPostsHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
