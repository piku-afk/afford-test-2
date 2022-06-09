import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiltersSection } from '..';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { createMockRouter } from '@/utils/testData';

const user = userEvent.setup();
const server = setupServer();

// mocking call for useRouter
const router = createMockRouter({});
const MockComponent = () => (
  <RouterContext.Provider value={router}>
    <FiltersSection urlBrands={[]} urlCategories={{}} />
  </RouterContext.Provider>
);

describe('FilterSection', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('matches snapshot', () => {
    const { asFragment } = render(<MockComponent />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders different components correctly', () => {
    render(<MockComponent />);

    expect(screen.getByText(/brands/i)).toBeInTheDocument();
    expect(screen.getByText(/categories/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/price/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('adds query parameters to the url when submit clicked', async () => {
    server.use(
      rest.get('http://localhost:5000/filters', (req, res, ctx) => {
        return res(
          ctx.json({
            searchFilters: {
              categories: [],
              brands: [
                { ID: '1', name: 'Linkedin' },
                { ID: '2', name: 'Sony' },
              ],
            },
          })
        );
      })
    );

    render(<MockComponent />);

    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(router.push).toBeCalled();
  });
});

export {};
