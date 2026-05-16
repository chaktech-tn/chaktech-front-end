/** @jest-environment node */

const { NextRequest, NextResponse } = require('next/server');

const intlMiddlewareMock = jest.fn(() => NextResponse.next());
const createMiddlewareMock = jest.fn(() => intlMiddlewareMock);

jest.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: createMiddlewareMock,
}));

const middleware = require('../middleware').default;

describe('storefront middleware locale redirects', () => {
  beforeEach(() => {
    intlMiddlewareMock.mockClear();
  });

  test('passes /en through to next-intl instead of stripping the locale', () => {
    const request = new NextRequest('https://dev.chaktech.tn/en');

    const response = middleware(request);

    expect(intlMiddlewareMock).toHaveBeenCalledWith(request);
    expect(response.headers.get('location')).toBeNull();
    expect(response.headers.get('x-pathname')).toBe('/en');
  });

  test('passes /en/shop through to next-intl instead of stripping the locale prefix', () => {
    const request = new NextRequest('https://dev.chaktech.tn/en/shop');

    const response = middleware(request);

    expect(intlMiddlewareMock).toHaveBeenCalledWith(request);
    expect(response.headers.get('location')).toBeNull();
    expect(response.headers.get('x-pathname')).toBe('/en/shop');
  });
});
