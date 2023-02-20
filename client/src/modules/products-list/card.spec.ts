import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import type { Product } from "../../models/types";
import Card from "./card.svelte";

describe("Card Page", () => {
  it("should contain card element", () => {
    let prod: Product;
    render(Card, {
      product: prod,
    });
    const cardElements: NodeListOf<Element> =
      document.querySelectorAll(".product-card");
    expect(cardElements.length).toBeGreaterThanOrEqual(1);
  });
});
