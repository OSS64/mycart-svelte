import { writable, readable, derived } from "svelte/store";

/**
 * Create a writeable Svelte store, can be accessed by $cart.
 */
export const cart = writable([]);

/**
 * Creates a derived Svelte Store, can be accessed by $totalPrice.
 */
export const totalPrice = derived(cart, ($cart) => {
  let price = 0;
  $cart.forEach(
    (product) =>
      (price =
        price +
        Number(product.price.toString().replaceAll(",", "")) * product.quantity)
  );
  return price;
});

/**
 * Creates readable svelte store, can be accessed by
 * $maxquantity and $minquantity respectively
 */
export const maxquantity = readable(10);
export const minquantity = readable(1);
