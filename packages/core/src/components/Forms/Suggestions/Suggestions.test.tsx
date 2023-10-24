import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvSuggestions } from "@core/components";

describe("Suggestions", () => {
  it("should be defined", () => {
    const { container } = render(<HvSuggestions />);
    expect(container).toBeDefined();
  });
});
