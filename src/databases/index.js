import { RedisError } from 'redis';
import redisClient from './redisClient';
import odbcClient from './odbcClient';

async function query({ queryString, singleRow = false }) {
  try {
    const cachedValue = await redisClient.getAndParse(queryString);

    let result;
    if (cachedValue) {
      result = cachedValue;
    } else {
      result = await odbcClient.getFromDatabase(queryString);
      redisClient.setAndStrigify(queryString, result);
    }

    return singleRow ? result.rows[0] : result;
  } catch (err) {
    let result;
    const { odbcErrors } = err;

    if (odbcErrors) {
      console.error('Error querying database: ', { odbcErrors, queryString });
      console.error('Returning empty result...');
      result = { rows: [], count: 0 };
      odbcClient.connect();
      console.log(err);
    } else if (err instanceof RedisError) {
      console.error('Error querying Redis: ', { err, queryString });
      console.error('Querying database instead...');
      result = odbcClient.getFromDatabase(queryString);
    }

    return singleRow ? result.rows[0] : result;
  }
}

const client = {
  query,
};
export { client };