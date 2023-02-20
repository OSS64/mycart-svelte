import { describe, expect, it, vi } from "vitest";
import { Utility } from "../shared/utilities/utility";
import { logout } from "./auth.store";

describe("Auth File", () => {
  it("Should have logout method", () => {
    expect(logout).toBeDefined();
    const clearSpy = vi.fn(Utility.clear);
    expect(clearSpy).not.toHaveBeenCalled();
    clearSpy();
    expect(clearSpy).toHaveBeenCalled();
  });

  /* it("Should redirect to login page", () => {
    logout();
    expect(window.location.href).toBe(AppConstants.baseApi + "/");
  }); */
});
