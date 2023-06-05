import { createClient } from 'redis';
import { REDIS_HOST } from '../setup';

const EXPIRATION_TIME_MS = 10; //TODO mandar isso no construtor
class RedisClient {
  constructor() {
    const socket = { host: REDIS_HOST || 'localhost', port: 6379 };
    this.client = createClient({ socket });
    // TODO criar verificacao e ignorar se o client estiver down
    (async () => this.client.connect())();
    this.client.on('connect', () => console.log('Redis Client Connected'));
  }

  async getAndParse(queryString) {
    try {
      const cachedValue = await this.client.get(queryString);

      if (!cachedValue || Object.getOwnPropertyNames(cachedValue).length === 0) {
        return null;
      }

      return JSON.parse(cachedValue);
    } catch (err) {
      console.error(err);
      this.client.del(queryString);
      return null;
    }
  }

  setAndStrigify(queryString, result) {
    this.client.setEx(queryString, EXPIRATION_TIME_MS, JSON.stringify(result));
  }

  delete(key) {
    this.client.del(key);
  }
}

export default new RedisClient();
