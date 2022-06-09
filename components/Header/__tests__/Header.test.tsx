import { render, screen } from '@testing-library/react';
import { Header } from '..';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('Header Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });

it('renders different component correctly', () => {
  render(<Header />);

  const header = screen.getByText(/sample ecom/i);
  const categoryButton = screen.getByRole('button', {
    name: /all categories/i,
  });
  const profileButton = screen.getByRole('button', {
    name: /profile/i,
  });
  const cartButton = screen.getByRole('button', {
    name: /cart/i,
  });

  expect(header).toBeInTheDocument();
  expect(categoryButton).toBeInTheDocument();
  expect(profileButton).toBeInTheDocument();
  expect(cartButton).toBeInTheDocument();
});

it('opens cart popup when cart button is clicked', async () => {
  render(<Header />);

  const cartButton = screen.getByRole('button', {
    name: /cart/i,
  });
  await user.click(cartButton);

  const cartPopper = screen.getByRole('presentation', { name: 'cart-popup' });
  const closeButton = screen.getByRole('button', {
    name: /close-cart/i,
  });

  expect(cartPopper).toBeInTheDocument();
  expect(cartPopper).toHaveAttribute('id', 'show-cart');
  expect(closeButton).toBeInTheDocument();

  await user.click(closeButton);

  expect(screen.queryByRole('presentation', { name: 'cart-popup' })).toBe(null);
});
});
