/* eslint-disable no-param-reassign */
import odbc from 'odbc';
import { DB_DRIVER, DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '../setup.js';
import DatabaseError from '../errors/DatabaseError.js';

const BIG_INT_DATA_CODE = -5;
const MAX_RETRY_ATTEMPS = 3;
const RETRY_DELAY_MS = [0, 200, 400, 800];

export default class ObdcClient {
  constructor() {
    this.connectionString = `DRIVER={${DB_DRIVER}}; SERVER=${DB_SERVER}; PORT=${DB_PORT}; DATABASE=${DB_NAME}; UID=${DB_USER}; PWD=${DB_PASSWORD}; CHARSET=UTF8;`;
    this.connect();
  }

  connect() {
    odbc.pool(this.connectionString, async (err, pool) => {
      if (err) {
        console.error(`Error connecting to OBDC Client`, err);
      } else {
        console.log('ODBC Client Connected');
        this.pool = pool;
      }
    });
  }

  retryConnection() {
    this.pool = null;
    this.connect();
  }

  async executeQueryWithRetry(queryString) {
    let retryCount = 0;
    while (retryCount < MAX_RETRY_ATTEMPS) {
      try {
        const result = await this.pool.query(queryString);
        return result;
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS[retryCount]));

        retryCount++;
        this.retryConnection();
        console.error(`Error executing OBDC query (Attempt ${retryCount}):`);
        if (retryCount >= MAX_RETRY_ATTEMPS) {
          console.error('Error executing OBDC query: Max retry attempts reached.', err);
          throw new DatabaseError(retryCount);
        }
      }
    }
  }

  async getFromDatabase(queryString) {
    if (!this.pool) throw new DatabaseError(0, 'Database Connection Error');

    const result = await this.executeQueryWithRetry(queryString);
    const { count, columns } = result;
    const rows = result.slice(0, count);

    for (const column of columns) {
      if (column.dataType === BIG_INT_DATA_CODE) {
        const { name: columnName } = column;
        for (const row of rows) {
          row[columnName] = Number(row[columnName]);
        }
      }
    }

    const returnObject = { rows, count };
    return returnObject;
  }
}
