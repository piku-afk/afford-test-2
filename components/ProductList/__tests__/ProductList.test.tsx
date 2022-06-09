import { render, screen, within } from '@testing-library/react';
import { ProductList } from '..';

const MockProductList = () => (
  <ProductList
    products={[
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

describe('Product List', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<MockProductList />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a product list', () => {
    render(<MockProductList />);

    const productCard = screen.getByTestId('product-card');
    const addButton = within(productCard).getByRole('button', {
      name: /add to cart/i,
    });
    const productTitle = within(productCard).getByText(/product 1/i);

    expect(productCard).toBeInTheDocument();
    expect(productTitle).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
});

export {};
