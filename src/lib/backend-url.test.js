import { buildBackendUrl, getBackendBaseUrl } from './backend-url';

describe('backend-url contract', () => {
  const originalBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  afterEach(() => {
    if (originalBaseUrl === undefined) {
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_API_BASE_URL = originalBaseUrl;
    }
  });

  test('getBackendBaseUrl trims a trailing slash', () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com/';

    expect(getBackendBaseUrl()).toBe('https://api.example.com');
  });

  test('buildBackendUrl appends query params to backend paths', () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com';

    expect(buildBackendUrl('/user-order/order-by-user', { page: 2, limit: 10 })).toBe(
      'https://api.example.com/user-order/order-by-user?page=2&limit=10'
    );
  });

  test('getBackendBaseUrl throws when NEXT_PUBLIC_API_BASE_URL is missing', () => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    expect(() => getBackendBaseUrl()).toThrow(
      'NEXT_PUBLIC_API_BASE_URL environment variable is not set'
    );
  });
});
