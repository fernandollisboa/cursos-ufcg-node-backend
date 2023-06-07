import { createClient } from 'redis';
import { REDIS_HOST } from '../setup';

const EXPIRATION_TIME_MS = 10;
export default class RedisClient {
  constructor() {
    const socket = { host: REDIS_HOST || 'localhost', port: 6379 };
    this.isConnected = false;
    try {
      this.client = createClient({ socket });
      this.connect();
      this.client.on('connect', () => {
        this.isConnected = true;
        console.log('Redis Client Connected');
        console.log(this.isConnected);
      });
    } catch (err) {
      console.error(err);
    }
  }

  connect() {
    this.client.connect();
  }

  isConnectionUp() {
    return this.isConnected;
  }

  async getAndParse(queryString) {
    try {
      let result = null;

      const cachedValue = await this.client.get(queryString);
      if (cachedValue && cachedValue.length !== 0) {
        result = JSON.parse(cachedValue);
      }

      return result;
    } catch (err) {
      console.error('Error executing Redis query ', err);
      await this.client.del(queryString);
      return null;
    }
  }

  async setAndStrigify(queryString, value) {
    const stringifiedValue = JSON.stringify(value);
    await this.client.setEx(queryString, EXPIRATION_TIME_MS, stringifiedValue);
  }

  async cacheValue(queryString, value) {
    await this.setAndStrigify(queryString, value);
  }

  delete(key) {
    this.client.del(key);
  }
}
