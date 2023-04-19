import { RedisError } from 'redis';
import redisClient from './redisClient';
import odbcClient from './odbcClient';

const EXPIRATION_TIME_MS = 10;

async function query({ queryString, singleRow = false }) {
  const time = Date.now();
  try {
    console.log(queryString);
    const cachedValue = await redisClient.getAndParse(queryString);

    console.log({ cachedValue });
    let result;
    if (cachedValue) {
      result = cachedValue;
    } else {
      result = await odbcClient.getFromDatabase(queryString);
      redisClient.setAndStrigify(queryString, result);
    }
    console.log(result);

    const timeElapsed = Date.now() - time;
    console.log(`Query took ${timeElapsed}ms to complete.`);

    return singleRow ? result.rows[0] : result;
  } catch (err) {
    let result;
    console.log('err', { err });
    if (err instanceof RedisError) {
      console.error('Error querying Redis: ', { err, queryString });
      console.error('Querying database instead...');
      result = odbcClient.getFromDatabase(queryString);
    } else {
      console.error('Error querying database: ', { err, queryString });
      console.error('Returning empty result...');
      result = { rows: [], count: 0 };
    }
    return singleRow ? result.rows[0] : result;
  }
}

const client = {
  query,
};
export { client };
