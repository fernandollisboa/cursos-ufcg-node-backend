import RedisClient from './RedisClient';
import OdbcClient from './OdbcClient';
import { NODE_ENV, REDIS_CACHE_EXPIRATION_TIME_MS } from '../setup';

class DatabaseClient {
  constructor() {
    if (NODE_ENV === 'test') {
      this.odbcClient = null;
      this.redisClient = null;
    } else {
      this.odbcClient = new OdbcClient();
      this.createRedisClientAsync(REDIS_CACHE_EXPIRATION_TIME_MS);
    }
  }

  async getFromCache(queryString) {
    let result = null;
    if (this.redisClient) {
      const cachedValue = await this.redisClient.getAndParse(queryString);
      result = cachedValue;
    }
    return result;
  }

  async query({ queryString, singleRow = false }) {
    try {
      const cachedValue = await this.getFromCache(queryString);

      let result;
      if (cachedValue) {
        result = cachedValue;
      } else {
        result = await this.odbcClient.getFromDatabase(queryString);
        await this.redisClient.cacheValue(queryString, result);
      }
      return singleRow ? result.rows[0] : result;
    } catch (err) {
      const { odbcErrors } = err;

      let result;
      if (odbcErrors) {
        console.error('Error querying database: ', { odbcErrors, queryString });
        result = { rows: [], count: 0 };
      } else {
        result = await this.odbcClient.getFromDatabase(queryString);
      }

      return singleRow ? result.rows[0] : result;
    }
  }

  async createRedisClientAsync(cacheExpirationTimeMs) {
    const redisClient = new RedisClient(cacheExpirationTimeMs);
    try {
      await redisClient.client.ping();
      this.redisClient = redisClient;
    } catch (err) {
      console.log(
        'Failed to Connect to Redis\n' + '!-> Running without cache, using only ODBC Client'
      );
      this.redisClient = null;
    }
  }
}
export const client = new DatabaseClient();
