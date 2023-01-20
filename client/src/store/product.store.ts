import { writable } from "svelte/store";

/**
 * Creates a writable svelte store, can be accessed by $productStore.
 */
export const productStore = writable([]);

/**
 * Create a writable svelte store, can be accessed in component by $categoryStore
 */
let initialCategory: string[] = [];
export const categoryStore = writable(initialCategory);

/**
 * Returns whether categoryStore has data in it or not.
 * @returns - true, if categoryStore has data.
 */
const hasCategory = (): boolean => {
  return categoryStore.subscribe((item) => item).length > 0;
};

/**
 * Export object to access it properties.
 */
export const prodStore = {
  hasCategory: hasCategory(),
};
