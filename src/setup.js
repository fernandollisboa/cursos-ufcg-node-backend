/* eslint-disable*/
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const {
  NODE_ENV,
  API_PORT,
  DB_DRIVER,
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DEFAULT_SCHEMA,
  OPENCPU_SERVER,
  OPENCPU_PORT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_CACHE_EXPIRATION_TIME_MS,
} = env;
