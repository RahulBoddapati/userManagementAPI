const Redis = require("ioredis")

let redis

if (process.env.NODE_ENV !== "test") {
  redis = new Redis()

  redis.on("connect", () => {
    console.log("Redis connected")
  })

  redis.on("error", (err) => {
    console.error("Redis error:", err.message)
  })
} else {
  redis = {
    get: async () => null,
    set: async () => null
  }
}

module.exports = redis