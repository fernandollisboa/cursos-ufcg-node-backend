import httpStatusCode from '../enum/httpStatusCode';
import BaseError from './BaseError';

export default class DatabaseError extends BaseError {
  constructor(
    retryCount = 0,
    message = `Query execution failed after ${retryCount} attempts`,
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
    this.message = message;
    this.statusCode = statusCode;
  }
}
