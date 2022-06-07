import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart } from '../index';
import { initialState, Product } from '@/context/initialState';
import * as GlobalContext from '@/context/GlobalStore';
import { useReducer } from 'react';
import { reducer } from '@/context/reducer';
import { mockProducts } from '@/utils/testData';

const user = userEvent.setup();

const MockCart = () => (
  <Cart id='hello-world' anchorElement={{} as Element} handleClose={() => {}} />
);

jest.spyOn(GlobalContext, 'useGlobalStore').mockReturnValue({
  state: { categories: [], brands: [], cart: mockProducts },
  dispatch: jest.fn,
});

it('renders a different elements', () => {
  render(<MockCart />);

  const cartPopup = screen.getByRole('presentation');
  const heading = screen.getByRole('heading', { name: /shopping cart/i });
  const closeButton = screen.getByRole('button', { name: /close-cart/i });
  const continueShopping = screen.getByText(/continue shopping/i);
  const checkoutButton = screen.getByRole('button', {
    name: /go to checkout/i,
  });

  expect(cartPopup).toHaveAttribute('id', 'hello-world');
  expect(heading).toBeInTheDocument();
  expect(closeButton).toBeInTheDocument();
  expect(continueShopping).toBeInTheDocument();
  expect(checkoutButton).toBeInTheDocument();
});

// it('renders empty cart initially', () => {
//   render(<MockCart />);

//   const emptyCart = screen.getByText(/empty cart/i);
//   expect(emptyCart).toBeInTheDocument();
// });

it('render products in cart', async () => {
  render(<MockCart />);

  const emptyCart = screen.queryByText(/empty cart/i);
  const products = screen.getAllByTestId('product-card');

  expect(emptyCart).toBe(null);
  expect(products).toHaveLength(1);

  await user.click(
    within(products[0]).getByRole('button', { name: /remove/i })
  );

  // expect(products).toHaveLength(0);
});

export {};
