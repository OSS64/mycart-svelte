import { writable, readable, derived } from "svelte/store";
export const cart = writable([]);
export const totalPrice = derived(cart, ($cart) => {
    let price = 0
    $cart.forEach(product => price = price + Number(product.price.replaceAll(",", "")) * product.quantity)
    return price
})
export const maxquantity = readable(10);
export const minquantity = readable(1);