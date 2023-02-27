import { Utility } from "../shared/utilities/utility";
import { writable } from "svelte/store";

/**
 * Creates a svelte writable store, can be accessed by $authStore.
 */
export const authStore = writable({
  isAuthenticated: false,
  user: null,
});

/**
 * On logout, it reset svelte authStore.
 * then clear all session storage
 * then redirects to the login page.
 */
export const logout = () => {
  authStore.set({
    isAuthenticated: false,
    user: null,
  });
  Utility.clear();
  window.location.href = "/login";
};
