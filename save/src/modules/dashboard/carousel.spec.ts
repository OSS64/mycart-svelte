import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Carousel from "./carousel.svelte";

describe("Carousel Page", () => {
  it("has carousel container", () => {
    render(Carousel);
    const container = document.querySelector("#carouselExampleCaptions");
    expect(container).toBeTruthy();
  });
});
