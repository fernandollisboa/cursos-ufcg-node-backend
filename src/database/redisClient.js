import { createClient, RedisError } from 'redis';

const EXPIRATION_TIME_MS = 10; //TODO mandar isso no crontrutor
class RedisClient {
  constructor() {
    this.client = createClient(); // TODO trocar isso pra conseguir rodar dentro de container
    // TODO criar verificacao e ignorar se o client estiver down
    (async () => this.client.connect())();
    this.client.on('error', (err) => console.log(err));
    this.client.on('connect', () => console.log('Redis Client Connected'));
  }

  async getAndParse(queryString) {
    try {
      console.log(queryString);
      const cachedValue = await this.client.get(queryString);

      console.log(cachedValue);
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
    this.client.setEx(queryString, 1000, JSON.stringify(result));
  }

  delete(key) {
    this.client.del(key);
  }
}

export default new RedisClient();
