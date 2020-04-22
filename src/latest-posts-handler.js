const { getPosts } = require("./posts-api");
const { getUserById } = require("./users-api");
const withCacheAsync = require("./with-cache-async");

const getUserByIdWithCache = withCacheAsync(getUserById, { ttl: 1000 * 30 });

const latestPostsHandler = async (req, res, next) => {
  try {
    // exercise: Abstract the cache (the map) from the for loop. ONLY THE CACHE!
    // get 10 posts from the post api
    const posts = await getPosts();
    const latestPosts = posts.slice(0, 10);

    for (let latestPost of latestPosts) {
      latestPost.user = await getUserByIdWithCache(latestPost.userId);
    }

    res.json(latestPosts);
  } catch (error) {
    return next(error);
  }
};

module.exports = latestPostsHandler;
