const Transporter = require("../models/Transporter");
const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

const searchTransporters = async (criteria) => {
  const { location, vehicleType } = criteria;

  // Check Redis cache
  const cacheKey = `search:${location}:${vehicleType}`;
  const cachedResults = await client.get(cacheKey);

  if (cachedResults) {
    return JSON.parse(cachedResults);
  }

  // Fetch transporters from MongoDB
  const transporters = await Transporter.find({
    location,
    vehicleType,
    availability: true,
  });

  // Cache the results
  client.setex(cacheKey, 3600, JSON.stringify(transporters)); // Cache for 1 hour
  return transporters;
};

module.exports = {
  searchTransporters,
};
