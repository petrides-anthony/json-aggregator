const { getPosts } = require("./posts-api");
const { getUserById } = require("./users-api");

const latestPostsHandler = async (req, res, next) => {
  try {
    // exercise: Abstract the cache (the map) from the for loop. ONLY THE CACHE!
    // get 10 posts from the post api
    const posts = await getPosts();
    const latestPosts = posts.slice(0, 10);
    // fetch user data for each post
    const grabbedUsers = new Map();

    for (let latestPost of latestPosts) {
      let userData;
      if (!grabbedUsers.has(latestPost.userId)) {
        userData = await getUserById(latestPost.userId);
        grabbedUsers.set(latestPost.userId, userData);
      } else {
        userData = grabbedUsers.get(latestPost.userId);
      }

      latestPost.user = userData;
    }
    res.json(latestPosts);
  } catch (error) {
    return next(error);
  }
};

module.exports = latestPostsHandler;
