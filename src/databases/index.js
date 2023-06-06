import { RedisError } from 'redis';
import RedisClient from './RedisClient';
import OdbcClient from './OdbcClient';
import { NODE_ENV } from '../setup';

class DatabaseClient {
  constructor() {
    let redisClient, odbcClient;

    if (NODE_ENV === 'test') {
      odbcClient = null;
      redisClient = null;
    } else {
      odbcClient = new OdbcClient();
      redisClient = new RedisClient();

      if (!redisClient.isConnectionUp()) {
        redisClient = null;
      }
    }
    this.redisClient = redisClient;
    this.odbcClient = odbcClient;
  }

  async getFromCache(queryString) {
    if (this.redisClient) {
      const cachedValue = await this.redisClient.getAndParse(queryString);
      return cachedValue ? cachedValue : null;
    }
    return null;
  }

  async query({ queryString, singleRow = false }) {
    try {
      const cachedValue = await this.getFromCache(queryString);

      let result;
      if (cachedValue) {
        result = cachedValue;
      } else {
        result = await this.odbcClient.getFromDatabase(queryString);
        this.redisClient.setAndStrigify(queryString, result);
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
}
export const client = new DatabaseClient();
