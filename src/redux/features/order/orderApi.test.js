let capturedEndpoints;

const injectEndpoints = jest.fn((config) => {
  capturedEndpoints = config.endpoints({
    mutation: (definition) => definition,
    query: (definition) => definition,
  });

  return capturedEndpoints;
});

jest.mock('../../api/apiSlice', () => ({
  apiSlice: {
    injectEndpoints,
  },
}));

jest.mock('./orderSlice', () => ({
  set_client_secret: jest.fn((payload) => ({ type: 'order/set_client_secret', payload })),
}));

describe('storefront order/orderApi backend contract', () => {
  beforeEach(() => {
    capturedEndpoints = undefined;
    jest.resetModules();
  });

  test('createPaymentIntent posts to the backend payment intent endpoint', () => {
    jest.isolateModules(() => {
      require('./orderApi');
    });

    expect(capturedEndpoints.createPaymentIntent.query({ total: 1000 })).toEqual({
      url: 'order/create-payment-intent',
      method: 'POST',
      body: { total: 1000 },
    });
  });

  test('addOrder posts to the backend addOrder endpoint', () => {
    jest.isolateModules(() => {
      require('./orderApi');
    });

    expect(capturedEndpoints.addOrder.query({ orderId: 'abc123' })).toEqual({
      url: 'order/addOrder',
      method: 'POST',
      body: { orderId: 'abc123' },
    });
  });
});
