const {
  normalizeStorefrontImageUrl,
  shouldUseUnoptimizedImage,
} = require('../../src/utils/storefront-image');

describe('storefront image URL normalization', () => {
  it('rewrites localhost backend product images to the active hostname', () => {
    expect(
      normalizeStorefrontImageUrl(
        'http://localhost:5001/uploads/products/example.jpg',
        '100.97.72.116'
      )
    ).toBe('http://100.97.72.116:5001/uploads/products/example.jpg');
  });

  it('bypasses next/image optimization for local backend uploads', () => {
    expect(
      shouldUseUnoptimizedImage(
        'http://100.97.72.116:5001/uploads/products/example.jpg'
      )
    ).toBe(true);
  });
});
