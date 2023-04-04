/* eslint-disable no-unused-vars */
import httpStatusCode from '../enum/httpStatusCode';
import BaseError from '../errors/BaseError';

export default async function errorMiddleware(err, req, res, next) {
  console.error('Middleware de erro:\n', err);

  if (err instanceof BaseError) {
    const { statusCode, message } = err;
    return res.status(statusCode).send({ message });
  }

  return res.sendStatus(httpStatusCode.INTERNAL_SERVER_ERROR);
}
