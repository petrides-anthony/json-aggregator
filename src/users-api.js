const fetch = require("node-fetch");
const { NotFound } = require("http-errors");

const getUserById = async userId => {
  const userRes = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!(userRes.status >= 200 && userRes.status < 400)) {
    throw new NotFound(
      `Wrong status code from users api: ${userRes.status}, userId ${userId}`
    );
  }

  return await userRes.json();
};

module.exports = { getUserById };
