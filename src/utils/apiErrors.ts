// Base exception class for all API-related errors
class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(message);
    this.name = 'BadRequestError';
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden access') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

class ServerError extends ApiError {
  constructor(message = 'Server error') {
    super(message);
    this.name = 'ServerError';
  }
}

export async function handleApiResponse(response: Response): Promise<void> {
  // First, try to extract the error message from the response body
  let serverMessage = 'Unknown error occurred';
  if (!response.ok) {
    console.log('response', response);
    const responseBody = await response.json();
    serverMessage = responseBody.message || serverMessage;
  }
  switch (response.status) {
    case 400:
      throw new BadRequestError(serverMessage);
    case 401:
      throw new UnauthorizedError(serverMessage);
    case 403:
      throw new ForbiddenError(serverMessage);
    case 404:
      throw new NotFoundError(serverMessage);
    case 500:
    default:
      throw new ServerError(serverMessage);
  }
}
