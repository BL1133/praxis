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

export function handleApiResponse(response: Response): Promise<void> {
  switch (response.status) {
    case 400:
      throw new BadRequestError();
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 404:
      throw new NotFoundError();
    case 500:
    default:
      throw new ServerError();
  }
}
