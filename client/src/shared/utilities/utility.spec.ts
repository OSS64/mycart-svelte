import { describe, expect, it } from "vitest";
import { Utility } from "./utility";

describe("Utility File", () => {
  it("Should have setToken method", () => {
    expect(Utility.setToken).toBeDefined();
  });
  it("Should have getToken method", () => {
    expect(Utility.getToken).toBeDefined();
  });
  it("Should have clear method", () => {
    expect(Utility.clear).toBeDefined();
  });
  it("Should have setUser method", () => {
    expect(Utility.setUser).toBeDefined();
  });
  it("Should have getUser method", () => {
    expect(Utility.getUser).toBeDefined();
  });
  it("Should have getUser method", () => {
    expect(Utility.getUser).toBeDefined();
  });
});
