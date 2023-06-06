import { createClient } from 'redis';
import { REDIS_HOST } from '../setup';

const EXPIRATION_TIME_MS = 10;
export default class RedisClient {
  constructor() {
    const socket = { host: REDIS_HOST || 'localhost', port: 6379 };
    try {
      this.isConnected = false;
      this.client = createClient({ socket });
      this.connect();
      this.client.on('connect', () => {
        console.log('Redis Client connected');
      });
    } catch (err) {
      console.error(err);
    }
  }

  connect() {
    this.client.connect();
    this.isConnected = true;
  }

  isConnectionUp() {
    return this.isConnected;
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
    const stringifiedResult = JSON.stringify(result);
    this.client.setEx(queryString, EXPIRATION_TIME_MS, stringifiedResult);
  }

  delete(key) {
    this.client.del(key);
  }
}
