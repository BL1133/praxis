export class AuthRequiredError extends Error {
  constructor() {
    super('Authentication is required to access this resource');
    this.name = 'AuthRequiredError';
  }
}
