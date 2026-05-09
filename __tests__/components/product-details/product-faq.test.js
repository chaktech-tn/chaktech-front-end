import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("styled-jsx/style", () => () => null, { virtual: true });
jest.mock("next-intl", () => ({
  useTranslations: () => (message) => message,
}));

import ProductFAQ from "../../../src/components/product-details/product-faq";

describe("ProductFAQ", () => {
  it("renders a distinct FAQ section with accessible expandable answers", async () => {
    const user = userEvent.setup();

    render(<ProductFAQ />);

    expect(
      screen.getByRole("heading", {
        name: /frequently asked questions/i,
        level: 3,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /frequently asked questions/i })
    ).toBeInTheDocument();

    const shippingButton = screen.getByRole("button", {
      name: /what is the shipping time/i,
    });
    const authenticityButton = screen.getByRole("button", {
      name: /is this product original and authentic/i,
    });

    expect(shippingButton).toHaveAttribute("aria-expanded", "false");
    expect(authenticityButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("region", { name: /what is the shipping time/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("region", {
        name: /is this product original and authentic/i,
      })
    ).not.toBeInTheDocument();

    await user.click(shippingButton);

    expect(shippingButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: /what is the shipping time/i })
    ).toHaveTextContent(/1-3 business days/i);

    await user.click(authenticityButton);

    expect(authenticityButton).toHaveAttribute("aria-expanded", "true");
    expect(shippingButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("region", { name: /what is the shipping time/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("region", {
        name: /is this product original and authentic/i,
      })
    ).toHaveTextContent(/100% original and authentic/i);
  });

  it("collapses an open answer when the same question is clicked twice quickly", async () => {
    const user = userEvent.setup();

    render(<ProductFAQ />);

    const shippingButton = screen.getByRole("button", {
      name: /what is the shipping time/i,
    });

    await user.dblClick(shippingButton);

    expect(shippingButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("region", { name: /what is the shipping time/i })
    ).not.toBeInTheDocument();
  });
});
