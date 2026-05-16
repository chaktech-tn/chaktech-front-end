/** @jest-environment node */

const { NextRequest, NextResponse } = require('next/server');

const intlMiddlewareMock = jest.fn(() => NextResponse.next());
const createMiddlewareMock = jest.fn(() => intlMiddlewareMock);

jest.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: createMiddlewareMock,
}));

const middleware = require('../middleware').default;

describe('storefront middleware locale routing', () => {
  beforeEach(() => {
    createMiddlewareMock.mockClear();
    intlMiddlewareMock.mockClear();
  });

  test('does not configure next-intl middleware for unprefixed routing', () => {
    expect(createMiddlewareMock).not.toHaveBeenCalled();
  });

  test('redirects /en to / and persists the locale cookie', () => {
    const request = new NextRequest('https://dev.chaktech.tn/en');

    const response = middleware(request);

    expect(intlMiddlewareMock).not.toHaveBeenCalled();
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://dev.chaktech.tn/');
    expect(response.headers.get('x-pathname')).toBe('/');
    expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('en');
  });

  test('redirects /en/shop to /shop and persists the locale cookie', () => {
    const request = new NextRequest('https://dev.chaktech.tn/en/shop');

    const response = middleware(request);

    expect(intlMiddlewareMock).not.toHaveBeenCalled();
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://dev.chaktech.tn/shop');
    expect(response.headers.get('x-pathname')).toBe('/shop');
    expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('en');
  });

  test('passes unprefixed paths through without invoking next-intl middleware', () => {
    const request = new NextRequest('https://dev.chaktech.tn/shop');

    const response = middleware(request);

    expect(intlMiddlewareMock).not.toHaveBeenCalled();
    expect(response.headers.get('location')).toBeNull();
    expect(response.headers.get('x-pathname')).toBe('/shop');
  });

  test('passes the root path through without rewriting to a locale path', () => {
    const request = new NextRequest('https://dev.chaktech.tn/');

    const response = middleware(request);

    expect(intlMiddlewareMock).not.toHaveBeenCalled();
    expect(response.headers.get('location')).toBeNull();
    expect(response.headers.get('x-middleware-rewrite')).toBeNull();
    expect(response.headers.get('x-pathname')).toBe('/');
  });
});
