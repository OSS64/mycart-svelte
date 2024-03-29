import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import ProductList from './list.svelte';
import 'vitest-fetch-mock';

describe('Product List Page', () => {
  /* beforeEach(() => {
    fetchMock.resetMocks();
  }); */
  it('has header', () => {
    render(ProductList);
    const header = screen.getByText(/Please wait/i);
    expect(header).toBeTruthy();
  });
});
