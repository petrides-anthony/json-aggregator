const fetch = require("node-fetch");
const { NotFound } = require("http-errors");

const getPosts = async () => {
  const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts/");
  if (!(postsRes.status >= 200 && postsRes.status < 400)) {
    throw new NotFound(`Wrong status code from posts api: ${postsRes.status}`);
  }

  return await postsRes.json();
};

module.exports = { getPosts };
