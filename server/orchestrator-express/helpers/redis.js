const Redis = require('ioredis')
const redis = new Redis({
    port: 18518, // Redis port
    host: "redis-18518.c284.us-east1-2.gce.cloud.redislabs.com", // Redis host
    password: "7vc5AMC9uYLGCYwg6b4cBSqYJgOYh4xi",
  });

module.exports = redis