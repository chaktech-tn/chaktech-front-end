import React from 'react';

const { renderToStaticMarkup } = require('react-dom/server.node');

let mockedUseMenu = () => ({
  isLoading: false,
  menu: {
    items: [
      {
        label: 'Parent',
        url: '#',
        type: 'mega',
        isActive: true,
        children: [
          {
            label: 'Child',
            url: '/child',
            type: 'category',
            isActive: true,
            children: [
              {
                label: 'Grandchild',
                url: '/grandchild',
                type: 'internal',
                isActive: true,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
});

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'fr',
}));

jest.mock(
  '../../src/components/menu/category-menu',
  () => ({
    __esModule: true,
    default: () => null,
  }),
  { virtual: true }
);

jest.mock(
  '../../src/hooks/useMenu',
  () => ({
    useMenu: () => mockedUseMenu(),
  }),
  { virtual: true }
);

describe('Menus', () => {
  it('does not render a li loading placeholder while menu data is loading', async () => {
    mockedUseMenu = () => ({ isLoading: true, menu: null });

    const { default: Menus } = await import('../../src/layout/menus');
    const markup = renderToStaticMarkup(<Menus />);

    expect(markup).toBe('<ul></ul>');
  });

  it('renders nested submenu items without li-inside-li nesting', async () => {
    mockedUseMenu = () => ({
      isLoading: false,
      menu: {
        items: [
          {
            label: 'Parent',
            url: '#',
            type: 'mega',
            isActive: true,
            children: [
              {
                label: 'Child',
                url: '/child',
                type: 'category',
                isActive: true,
                children: [
                  {
                    label: 'Grandchild',
                    url: '/grandchild',
                    type: 'internal',
                    isActive: true,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    const { default: Menus } = await import('../../src/layout/menus');

    const markup = renderToStaticMarkup(<Menus />);

    expect(markup).not.toContain('<li><li');
    expect(markup).toContain('<ul class="submenu"><li class="has-dropdown">');
  });
});
