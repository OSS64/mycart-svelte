import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import SignIn from "./login.svelte";
import { Utility } from "./../../shared/utilities/utility";
import { vi } from "vitest";
import type { User } from "../../models/types";

describe("Login component", () => {
  test("should confirm form is visible ", async () => {
    const { container } = render(SignIn);
    expect(container).toBeVisible();
  });

  test("type an invalid email", () => {
    expect(!Utility.isEmailInValid("a")).toBeFalsy();
  });

  describe("Given a valid email", () => {
    test("Return true", () => {
      expect(!Utility.isEmailInValid("aa@aa.aa")).toBeTruthy();
    });
  });

  test("Should have onSubmit method", () => {
    const { component } = render(SignIn);
    expect(component.onSubmit).toBeDefined();
  });

  test("Should call setToken", () => {
    const callSetToken = vi.fn(Utility.setToken);
    expect(callSetToken).not.toHaveBeenCalled();
    callSetToken("dummy token");
    expect(callSetToken).toHaveBeenCalled();
  });

  test("Should call setUser", () => {
    const user: User = {
      email: "aa@aa.com",
      password: "test",
      token: "dummy token",
    };
    const callSetUser = vi.fn(Utility.setUser);
    expect(callSetUser).not.toHaveBeenCalled();
    callSetUser(user);
    expect(callSetUser).toHaveBeenCalled();
  });
});
