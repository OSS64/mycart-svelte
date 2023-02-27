import { readable } from "svelte/store";
import couponData from "./coupon.json";

/**
 * Creates a readable svelte store, can be accessed by $couponStore.
 * Here data is accessed from coupon json.
 */
export const couponStore = readable(null, (set) => {
  set(couponData);
  return () => {};
});
