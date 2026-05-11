let capturedEndpoints;

const injectEndpoints = jest.fn((config) => {
  capturedEndpoints = config.endpoints({
    mutation: (definition) => definition,
    query: (definition) => definition,
  });

  return capturedEndpoints;
});

jest.mock('../api/apiSlice', () => ({
  apiSlice: {
    injectEndpoints,
  },
}));

describe('storefront orderApi backend contract', () => {
  beforeEach(() => {
    capturedEndpoints = undefined;
    jest.resetModules();
  });

  test('getUserOrders requests the user-order listing endpoint', () => {
    jest.isolateModules(() => {
      require('./orderApi');
    });

    expect(capturedEndpoints.getUserOrders.query()).toBe('/user-order/order-by-user');
  });

  test('getUserOrderById requests the single user-order endpoint', () => {
    jest.isolateModules(() => {
      require('./orderApi');
    });

    expect(capturedEndpoints.getUserOrderById.query('order-123')).toBe('/user-order/single-order/order-123');
  });
});
