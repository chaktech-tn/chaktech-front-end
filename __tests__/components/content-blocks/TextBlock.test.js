import React from "react";
import { render } from "@testing-library/react";
import TextBlock from "@/components/content-blocks/blocks/TextBlock";

describe("TextBlock", () => {
  it("sanitizes block text before rendering", () => {
    const { container } = render(
      <TextBlock
        block={{
          content: {
            title: "Title",
            text: '<p>Safe <em>markup</em></p><img src="x" onerror="alert(1)" /><script>alert(1)</script>',
          },
        }}
      />
    );

    const html = container.innerHTML;

    expect(html).toContain("Safe <em>markup</em>");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
  });
});
