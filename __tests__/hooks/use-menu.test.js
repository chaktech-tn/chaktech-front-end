import { renderHook, waitFor } from '@testing-library/react';
import { useMenu, clearMenuCache } from '../../src/hooks/useMenu';

describe('useMenu', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://api.example.com';
    process.env.NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS = 'false';
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 429 });
    clearMenuCache();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses default header items when API is 429 with no cache', async () => {
    const { result } = renderHook(() => useMenu('header', 'fr'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.menu).not.toBeNull();
    expect(result.current.menu.items).toEqual([
      { label: 'Home', url: '/', type: 'internal' },
      { label: 'Vente Flash', url: '/shop?category=vente-flash', type: 'internal' },
      { label: 'Contacts', url: '/contact', type: 'internal' },
    ]);
  });
});
