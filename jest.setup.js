const { server } = require('./mocks/server');
const { TextEncoder } = require('util');

global.TextEncoder = TextEncoder;
// import { TextEncoder, TextDecoder } from 'text-encoding';
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
