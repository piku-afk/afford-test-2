import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart } from '../index';
import { initialState, Product } from '@/context/initialState';
import { GlobalContext } from '@/context/GlobalStore';
import { useReducer } from 'react';
import { reducer } from '@/context/reducer';

const user = userEvent.setup();

const MockCart = () => (
  <Cart id='hello-world' anchorElement={{} as Element} handleClose={() => {}} />
);

const MockCartWithContext = ({ mockCart }: { mockCart: Product[] }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    cart: mockCart,
  });

  return (
    <GlobalContext.Provider
      value={{
        dispatch,
        state,
      }}>
      <MockCart />
    </GlobalContext.Provider>
  );
};

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

it('renders empty cart initially', () => {
  render(<MockCartWithContext mockCart={[]} />);

  const emptyCart = screen.getByText(/empty cart/i);
  expect(emptyCart).toBeInTheDocument();
});

it('render products in cart', async () => {
  render(
    <MockCartWithContext
      mockCart={[
        {
          id: '1',
          title: 'product 1',
          description: 'some description',
          price: '',
          category: '',
          image: 'http://placeimg.com',
          quantity: 1,
          rating: { rate: '', count: '' },
        },
      ]}
    />
  );

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
