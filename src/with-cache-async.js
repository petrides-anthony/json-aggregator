function withCacheAsync(
  job,
  {
    getKeyFromArgs = (arg) => arg,
    ttl = null
  }
) {
  const cache = new Map();

  const jobWithCache = async (...args) => {
    const key = getKeyFromArgs(...args);
    const now = Date.now();

    if (!cache.has(key)) {
      console.log(`running job for key #${key}`);
      const result = await job(...args);
      cache.set(key, { result, cacheTime: ttl !== null ? now : undefined });

      return result;
    }

    console.log(`grabbing result from cache for key #${key}`);
    const cacheValue = cache.get(key);

    if (ttl !== null) {
      const diff = now - cacheValue.cacheTime;
      if (diff > ttl) {
        console.log(`running job again for expired key #${key}`);
        const result = await job(...args);
        cache.set(key, { result, cacheTime: now });

        return result;
      }
    }

    return cacheValue.result;
  };

  return jobWithCache;
}

module.exports = withCacheAsync;
