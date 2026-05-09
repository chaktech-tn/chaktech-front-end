import React from "react";
import { MessageChannel } from "node:worker_threads";

global.MessageChannel = MessageChannel;

const { renderToStaticMarkup } = require("react-dom/server.node");

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ src, ...props }) => <script src={src} {...props} />,
}));

jest.mock("next/font/google", () => {
  const createFont = () => ({ variable: "--mock-font" });

  return {
    Poppins: createFont,
    Inter: createFont,
    Oswald: createFont,
    Rajdhani: createFont,
    Roboto: createFont,
    Space_Grotesk: createFont,
    Syne: createFont,
  };
});

jest.mock("next/headers", () => ({
  headers: jest.fn(async () => ({
    get: jest.fn(() => "/"),
  })),
}));

jest.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }) => <>{children}</>,
}));

jest.mock("next-intl/server", () => ({
  getLocale: jest.fn(async () => "en"),
  getMessages: jest.fn(async () => ({ common: {} })),
  setRequestLocale: jest.fn(),
}));

jest.mock(
  "@components/provider/main-provider",
  () => ({
    __esModule: true,
    default: ({ children }) => <>{children}</>,
  }),
  { virtual: true }
);

jest.mock(
  "@components/seo/structured-data",
  () => ({
    __esModule: true,
    default: () => null,
  }),
  { virtual: true }
);

jest.mock(
  "@components/tracking/FacebookPixel",
  () => ({
    __esModule: true,
    default: () => null,
  }),
  { virtual: true }
);

describe("RootLayout development script regression", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    document.documentElement.innerHTML = "";
    jest.resetModules();
  });

  it("does not render the react-grab dev script in head", async () => {
    process.env.NODE_ENV = "development";

    const { default: RootLayout } = await import("../../src/app/layout");
    const markup = renderToStaticMarkup(
      await RootLayout({ children: <div>Storefront</div> })
    );

    document.documentElement.innerHTML = markup;

    expect(
      document.head.querySelector(
        'script[src="https://unpkg.com/react-grab/dist/index.global.js"]'
      )
    ).toBeNull();
  });
});
