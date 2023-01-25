import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";

import Filter from "./Filters.svelte";

describe("Filter Page", () => {
  it("has brand options", () => {
    render(Filter);
    const brand = screen.getByText("Select Brand");
    expect(brand).toBeTruthy();
  });
});
