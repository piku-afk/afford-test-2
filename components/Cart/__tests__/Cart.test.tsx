import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart } from '../index';
import * as GlobalContext from '@/context/GlobalStore';
import { mockProducts } from '@/utils/testData';
import { ActionTypes } from '@/context/reducer';

const user = userEvent.setup();

const MockCart = () => (
  <Cart id='hello-world' anchorElement={{} as Element} handleClose={jest.fn} />
);
const dispatch = jest.fn();

describe('Cart', () => {
  beforeEach(() => {
    jest.spyOn(GlobalContext, 'useGlobalStore').mockReturnValue({
      state: { categories: [], brands: [], cart: mockProducts },
      dispatch,
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<MockCart />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders different elements', () => {
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
    jest.spyOn(GlobalContext, 'useGlobalStore').mockReturnValue({
      state: { categories: [], brands: [], cart: [] },
      dispatch,
    });

    render(<MockCart />);

    const emptyCart = screen.getByText(/empty cart/i);
    expect(emptyCart).toBeInTheDocument();
  });

  it('render products in cart', async () => {
    render(<MockCart />);

    const emptyCart = screen.queryByText(/empty cart/i);
    const products = screen.getAllByTestId('product-card');

    expect(emptyCart).toBe(null);
    expect(products).toHaveLength(1);

    await user.click(
      within(products[0]).getByRole('button', { name: /remove/i })
    );

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ActionTypes.removeFromCart,
        payload: mockProducts[0],
      })
    );
  });
});

export {};
