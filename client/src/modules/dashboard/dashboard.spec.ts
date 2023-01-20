import Dashboard from "./dashboard.svelte";
import { render, screen } from "@testing-library/svelte";
import "vitest-fetch-mock";
describe("Dashboard component", () => {
  beforeEach(() => {
    fetchMock.dontMock();
  });
  it("has Home page header", async () => {
    render(Dashboard);
    const search = screen.getByRole("button", { name: "Search" });
    expect(search).toBeTruthy();
  });
});
