/* eslint-disable no-param-reassign */
import odbc from 'odbc';
import { DB_DRIVER, DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '../setup.js';

const BIG_INT_DATA_CODE = -5;

const connectionString = `DRIVER={${DB_DRIVER}}; SERVER=${DB_SERVER}; PORT=${DB_PORT}; DATABASE=${DB_NAME}; UID=${DB_USER}; PWD=${DB_PASSWORD}; CHARSET=UTF8;`;

class ObdcClient {
  constructor() {
    this.connect();
  }

  connect() {
    odbc.pool(connectionString, (err, pool) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        setTimeout(() => this.connect(), 1000);
      } else {
        console.log('ODBC Client Connected');
        this.pool = pool;
      }
    });
  }

  async getFromDatabase(queryString) {
    if (!this.pool) throw new Error('Database connection not established yet.');

    const result = await this.pool.query(queryString);

    const { count, columns } = result;
    const rows = result.slice(0, count);

    for (let i = 0; i < columns.length; i++) {
      // If dataType is equal BigInt (dataType === -5), convert to Number
      if (columns[i].dataType === BIG_INT_DATA_CODE) {
        rows.forEach((row) => {
          row[columns[i].name] = Number(row[columns[i].name]);
        });
      }
    }
    return { rows, count };
  }
}

export default new ObdcClient();
