import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PORT } from '../setup';

const MAX_RETRY_ATTEMPS = 5;

export default class RedisClient {
  constructor(cacheExpirationTimeMs) {
    this.expirationTimeMs = cacheExpirationTimeMs || 1000 * 60 * 60 * 24 * 7; // 7 days
    this.isConnected = false;

    const socket = { host: REDIS_HOST, port: REDIS_PORT || 6379 };
    try {
      this.client = createClient({ socket });
      this.connect();
      this.createClientEvents();
    } catch (err) {
      console.error(err);
    }
  }

  createClientEvents() {
    try {
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
          await this.disconnect();
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.disconnect();
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
      await this.delete(queryString);
      return null;
    }
  }

  async setAndStrigify(queryString, value) {
    const stringifiedValue = JSON.stringify(value);
    await this.client.setEx(queryString, this.expirationTimeMs, stringifiedValue);
  }

  async cacheValue(queryString, value) {
    await this.setAndStrigify(queryString, value);
  }

  async delete(key) {
    await this.client.del(key);
  }
}
