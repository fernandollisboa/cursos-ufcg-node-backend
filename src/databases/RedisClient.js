import { createClient } from 'redis';
import { REDIS_HOST } from '../setup';

const REDIS_CACHE_EXPIRATION_TIME_MS = 10;
const MAX_RETRY_ATTEMPS = 3;

export default class RedisClient {
  constructor() {
    const socket = { host: REDIS_HOST || 'localhost', port: 6379 };
    this.isConnected = false;
    try {
      this.client = createClient({ socket });
      (async () => this.connect())();

      this.client.on('ready', () => {
        this.isConnected = true;
        console.log('Redis Client Connected');
      });

      let connectionErrorCount = 0;
      this.client.on('error', async (err) => {
        connectionErrorCount++;
        console.error(`Redis Client Error (Attempt ${connectionErrorCount})`);
        if (connectionErrorCount >= MAX_RETRY_ATTEMPS) {
          console.error('Redis Client Error: Max retry attempts reached.', err);
          this.client.disconnect();
        }
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
    await this.client.setEx(queryString, REDIS_CACHE_EXPIRATION_TIME_MS, stringifiedValue);
  }

  async cacheValue(queryString, value) {
    await this.setAndStrigify(queryString, value);
  }

  delete(key) {
    this.client.del(key);
  }
}
