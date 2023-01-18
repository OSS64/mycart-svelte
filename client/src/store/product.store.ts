import { writable } from "svelte/store";

/**
 * Creates a writable svelte store, can be accessed by $productStore.
 */
export const productStore = writable([]);
