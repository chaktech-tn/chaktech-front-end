import React from "react";
import { render } from "@testing-library/react";
import CustomHTMLBlock from "@/components/content-blocks/blocks/CustomHTMLBlock";

describe("CustomHTMLBlock", () => {
  it("sanitizes custom html before rendering", () => {
    const { container } = render(
      <CustomHTMLBlock
        block={{
          content: {
            html: '<div><a href="javascript:alert(1)">Link</a><iframe src="https://evil.example"></iframe></div>',
          },
        }}
      />
    );

    const html = container.innerHTML;

    expect(html).toContain(">Link<");
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("<iframe");
  });
});
