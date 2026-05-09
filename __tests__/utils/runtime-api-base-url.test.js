const { getRuntimeApiBaseUrl } = require('../../src/utils/runtime-api-base-url');

describe('getRuntimeApiBaseUrl', () => {
  it('rewrites localhost API base URLs to the active hostname for LAN browsing', () => {
    expect(
      getRuntimeApiBaseUrl('http://localhost:5001', '100.97.72.116')
    ).toBe('http://100.97.72.116:5001');
  });

  it('keeps non-local API base URLs unchanged', () => {
    expect(
      getRuntimeApiBaseUrl('https://api.chaktech.tn', '100.97.72.116')
    ).toBe('https://api.chaktech.tn');
  });
});
