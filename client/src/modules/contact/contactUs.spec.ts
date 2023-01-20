import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Contact from "./contactUs.svelte";

describe("Contact Page", () => {
  it("has Conatct page header", () => {
    render(Contact);
    const header = screen.getByRole("heading", { name: "GET IN TOUCH" });
    expect(header).toBeTruthy();
  });
});
