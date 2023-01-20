import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Feedback from "./feedback.svelte";

describe("Feedback Page", () => {
  it("has header", () => {
    render(Feedback);
    const header = screen.getByRole("heading", { name: "Contact Us" });
    expect(header).toBeTruthy();
  });
});
