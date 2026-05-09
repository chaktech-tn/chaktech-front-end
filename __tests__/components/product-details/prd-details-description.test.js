import React from "react";
import { render, screen } from "@testing-library/react";

import PrdDetailsDescription from "../../../src/components/product-details/prd-details-description";

describe("PrdDetailsDescription", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders highlights and specs when structured description content exists", () => {
    render(
      <PrdDetailsDescription
        product={{
          title: "SMARTWATCH Infinix XWATCH N4 Pro",
          description:
            "<ul><li><strong>Écran</strong> : 1,43 pouces AMOLED</li><li><strong>Autonomie</strong> : Jusqu’à 12 jours</li></ul><p>Montre connectée premium.</p>",
        }}
      />
    );

    expect(screen.getByText("Key highlights")).toBeInTheDocument();
    expect(
      screen.getByText("Écran", { selector: ".product-detail-highlight-card .label" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("1,43 pouces AMOLED", {
        selector: ".product-detail-highlight-card strong",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Detailed specs")).toBeInTheDocument();
    expect(
      screen.getByText("Écran", { selector: ".product-detail-spec-row .label" })
    ).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Montre connectée premium.")).toBeInTheDocument();
  });

  it("falls back to cleaned description without highlights when content is unstructured", () => {
    render(
      <PrdDetailsDescription
        product={{
          title: "Produit",
          description: "<p>Une description simple.</p>",
        }}
      />
    );

    expect(screen.queryByText("Key highlights")).not.toBeInTheDocument();
    expect(screen.queryByText("Detailed specs")).not.toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Une description simple.")).toBeInTheDocument();
  });

  it("keeps duplicate spec labels renderable while highlights stay deduplicated", () => {
    render(
      <PrdDetailsDescription
        product={{
          title: "Produit",
          description:
            "<ul><li><strong>Écran</strong> : AMOLED</li><li><strong>Écran</strong> : LCD</li><li><strong>Garantie</strong> : 6 mois</li></ul><p>Description d'origine.</p>",
        }}
      />
    );

    expect(
      screen.getAllByText("Écran", { selector: ".product-detail-spec-row .label" })
    ).toHaveLength(2);
    expect(screen.getByText("AMOLED", { selector: ".product-detail-highlight-card strong" })).toBeInTheDocument();
    expect(screen.queryByText("LCD", { selector: ".product-detail-highlight-card strong" })).not.toBeInTheDocument();
    expect(screen.getByText("LCD", { selector: ".product-detail-spec-row strong" })).toBeInTheDocument();
  });

  it("strips malicious HTML before rendering the cleaned description", () => {
    const { container } = render(
      <PrdDetailsDescription
        product={{
          title: "Produit sécurisé",
          description:
            '<p style="color:red">Description sûre.</p><script>alert("xss")</script><img src="https://example.com/watch.jpg" alt="Montre" onerror="alert(1)" />',
        }}
      />
    );

    expect(screen.getByText("Description sûre.")).toBeInTheDocument();

    const descriptionContainer = container.querySelector(
      ".product-detail-description-prose .product-detail-description-html"
    );
    const image = descriptionContainer?.querySelector("img");
    const paragraph = descriptionContainer?.querySelector("p");

    expect(descriptionContainer).not.toBeNull();
    expect(descriptionContainer.querySelector("script")).toBeNull();
    expect(descriptionContainer.innerHTML).not.toContain("<script");
    expect(image).not.toHaveAttribute("onerror");
    expect(paragraph).not.toHaveAttribute("style");
  });
});
