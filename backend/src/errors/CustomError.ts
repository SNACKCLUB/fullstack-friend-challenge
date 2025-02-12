export interface CustomError extends Error {
  statusCode: number;
  details?: any;
}

export function createCustomError(
  statusCode: number,
  message: string,
  details?: any
): CustomError {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  error.details = details;

  Object.setPrototypeOf(error, Error.prototype);
  Error.captureStackTrace(error, createCustomError);

  return error;
}
