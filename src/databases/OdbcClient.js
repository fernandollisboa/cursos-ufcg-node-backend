/* eslint-disable no-param-reassign */
import odbc from 'odbc';
import { DB_DRIVER, DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '../setup.js';
import DatabaseError from '../errors/DatabaseError.js';

const BIG_INT_DATA_CODE = -5;
const MAX_RETRY_ATTEMPS = 3;
const RETRY_DELAY = [200, 400, 800];

const connectionString = `DRIVER={${DB_DRIVER}}; SERVER=${DB_SERVER}; PORT=${DB_PORT}; DATABASE=${DB_NAME}; UID=${DB_USER}; PWD=${DB_PASSWORD}; CHARSET=UTF8;`;

export default class ObdcClient {
  constructor() {
    this.connect();
  }

  connect() {
    odbc.pool(connectionString, (err, pool) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        setTimeout(() => this.retryConnection(), Math.min(RETRY_DELAY));
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
    let result;
    let retryCount = 0;
    while (retryCount < MAX_RETRY_ATTEMPS) {
      try {
        result = await this.pool.query(queryString);
        break;
      } catch (err) {
        retryCount++;
        console.error(`Error executing query (Attempt ${retryCount}):`, err);
        this.retryConnection();

        if (retryCount === MAX_RETRY_ATTEMPS) {
          throw new DatabaseError(retryCount);
        }

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY[retryCount]));
      }
    }
    return result;
  }

  async getFromDatabase(queryString) {
    if (!this.pool) throw new DatabaseError(0, 'Database connection not established yet.');

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
