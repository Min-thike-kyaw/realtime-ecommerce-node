const asyncRedis = require("async-redis");
const redisDB = asyncRedis.createClient();

module.exports = {
    setObject : async (id, object) => await redisDB.set(id.toString(), JSON.stringify(object)),
    getObject: async (id) => JSON.parse(await redisDB.get(id.toString())),
    deleteObject: async (id) => await redisDB.del(id.toString())
}
