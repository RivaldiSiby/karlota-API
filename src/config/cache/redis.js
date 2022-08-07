const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

const redisConnect = async () => {
  try {
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    console.log("Redis connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { redisConnect, client };
