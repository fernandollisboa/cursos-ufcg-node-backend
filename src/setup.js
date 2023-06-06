/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;
const {
  DB_DRIVER,
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  R_SERVER_PORT,
  R_SERVER_URI,
  NODE_ENV,
} = env;

export {
  DB_DRIVER,
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  R_SERVER_PORT,
  R_SERVER_URI,
  NODE_ENV,
};
