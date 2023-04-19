import { createClient, RedisError } from 'redis';
import odbcClient from './odbcClient';

const redisClient = createClient(); // TODO trocar isso pra conseguir rodar dentro de container
// TODO criar verificacao e ignorar se o odbcclient estiver down

redisClient.on('error', (err) => err);
redisClient.on('connect', () => console.log('Redis Client Connected'));

(async () => {
  await redisClient.connect();
})();

async function getFromRedis(queryString) {
  return redisClient.get(queryString);
}

const EXPIRATION_TIME_MS = 10;
async function setToRedis(queryString, result) {
  return redisClient.setEx(queryString, EXPIRATION_TIME_MS, JSON.stringify(result));
}

async function query(queryString) {
  const time = Date.now();
  try {
    console.log(queryString);
    // const cachedValue = await getFromRedis(queryString);

    const result = await odbcClient.getFromDatabase(queryString);
    console.log(result);
    // setToRedis(queryString, result);

    const timeElapsed = Date.now() - time;
    console.log(`Query took ${timeElapsed}ms to complete.`);

    return result;
  } catch (err) {
    let result;
    console.log({ err });
    if (err instanceof RedisError) {
      console.error('Error querying redis: ', { err, queryString });
      console.log('Querying database instead...');
      result = odbcClient.getFromDatabase(queryString);
    } else {
      console.error('Error querying database: ', { err, queryString });
      console.error('Returning empty result...');
      result = { rows: [], count: 0 };
    }
    return result;
  }
}

const client = {
  query,
};
export { client };
