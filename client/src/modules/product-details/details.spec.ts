import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import Product from './details.svelte';

describe('Product Detail Page', () => {
  it('has Add To Cart Button', () => {
    render(Product);
    const addToCart = screen.getByText(/Please wait/i);
    expect(addToCart).toBeTruthy();
  });
  it('should have call on load', () => {
    const { component } = render(Product);
    expect(component.callOnLoad).toBeDefined();
  });
});
