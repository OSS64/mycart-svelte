import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import CartPage from "./cart.svelte";
import { cart } from "../../store/cart.store";

describe("Cart Page", () => {
  let $cart = [];
  cart.subscribe((results) => {
    $cart = results;
  });
  it("cart is empty", async () => {
    render(CartPage);
    if ($cart.length == 0) {
      const empty = screen.getByText("No items in cart yet.");
      expect(empty).toBeTruthy();
    }
  });
  it("cart is present", async () => {
    render(CartPage);
    if ($cart.length > 0) {
      const total = document.querySelector(".total");
      expect(total).toBeInTheDocument();
    }
  });
  test("Should contain applyCoupon method", async () => {
    const { component } = render(CartPage);
    expect(component.applyCoupon).toBeDefined();
  });
});
