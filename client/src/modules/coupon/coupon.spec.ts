import Coupon from "./coupon.svelte";
import { render, fireEvent, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("Coupon Component", () => {
  it("it emits an event", async () => {
    const { component } = render(Coupon);
    const button = screen.getByRole("button");
    let mockEvent = vi.fn();
    component.$on("applycoupon", function (event) {
      mockEvent(event.detail);
    });
    await fireEvent.click(button);

    // Some examples on what to test
    expect(mockEvent).toHaveBeenCalled();
  });
});
