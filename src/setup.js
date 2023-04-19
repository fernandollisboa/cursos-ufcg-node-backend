/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

const { DB_DRIVER, DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, API_PORT } = process.env;

export { DB_DRIVER, DB_SERVER, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, API_PORT };
