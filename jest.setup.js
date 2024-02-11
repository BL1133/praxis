const { server } = require('./mocks/server');
const { TextEncoder } = require('util');

global.TextEncoder = TextEncoder;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
