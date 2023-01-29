import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Card from "./card.svelte";

describe("Card Page", () => {
  it("should contain card element", () => {
    render(Card);
    const cardElements: NodeListOf<Element> =
      document.querySelectorAll(".product-card");
    expect(cardElements.length).toBeGreaterThanOrEqual(1);
  });
});
