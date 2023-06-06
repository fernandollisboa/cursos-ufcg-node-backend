/* eslint-disable no-unused-vars */
import { AxiosError } from 'axios';
import httpStatusCode from '../enum/httpStatusCode';
import BaseError from '../errors/BaseError';

export default async function errorMiddleware(err, req, res, next) {
  console.error('Error Middleware:\n');

  if (err instanceof AxiosError) {
    const { response } = err;
    const { data } = response;
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(data);
  }
  if (err instanceof BaseError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({ message });
  }

  console.log(err);

  return res.sendStatus(httpStatusCode.INTERNAL_SERVER_ERROR);
}
