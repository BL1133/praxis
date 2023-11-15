/**
 * @fileoverview Custom error classes for handling API errors
 * Identifies type of API error based on response status and attaches the correct name to be handled.
 *
 * @module utils/apiErrors
 */
export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden access') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends ApiError {
  constructor(message = 'Server error') {
    super(message);
    this.name = 'ServerError';
  }
}

export async function handleApiError(response: Response): Promise<void> {
  // First, try to extract the error message from the response body
  let serverMessage = 'Unknown error occurred';

  console.log('response', response);
  const responseBody = await response.json(); // ex. { errors: [ { message: 'The requested resource was not found.' } ] }
  serverMessage = responseBody.errors[0].message || serverMessage;

  switch (response.status) {
    case 400:
      throw new BadRequestError(serverMessage);
    case 401:
      throw new UnauthorizedError(serverMessage);
    case 403:
      throw new ForbiddenError(serverMessage);
    case 404:
      throw new NotFoundError(serverMessage);
    default:
      throw new ServerError(serverMessage);
  }
}
