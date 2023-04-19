/* eslint-disable no-param-reassign */
import odbc from 'odbc';
import { DB_DRIVER, DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '../setup.js';

const connectionString = `DRIVER={${DB_DRIVER}}; SERVER=${DB_SERVER}; PORT=${DB_PORT}; DATABASE=${DB_NAME}; UID=${DB_USER}; PWD=${DB_PASSWORD}; CHARSET=UTF8;`;

class ObdcClient {
  constructor() {
    odbc.pool(connectionString, (err, pool) => {
      if (err) console.error('Error connecting to database: ', err);
      else {
        console.log('Obdc Client Connected');
        this.pool = pool;
      }
    });
  }

  async getFromDatabase(queryString) {
    if (!this.pool) throw new Error('Database connection not established yet.');

    const result = await this.pool.query(queryString);
    console.log(result);

    const { count, columns } = result;
    const rows = result.slice(0, count);
    console.log(rows);

    for (let i = 0; i < columns.length; i++) {
      console.log({ columns });
      // If type is equal BigInt (dataType === -5), convert to Number
      if (columns[i].dataType === -5) {
        rows.forEach((row) => {
          row[columns[i].name] = Number(row[columns[i].name]);
        });
        // rows[i][columns[i].name] = Number(rows[i][columns[i].name]);
      }
    }
    console.log({ rows });
    return { rows, count };
  }
}

export default new ObdcClient();
