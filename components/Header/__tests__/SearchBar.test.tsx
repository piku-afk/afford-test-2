import { render, screen } from '@testing-library/react';
import { SearchBar } from '../searchBar';
import userEvent from '@testing-library/user-event';
import * as GlobalContext from '@/context/GlobalStore';

const user = userEvent.setup();
const mockCategories = [
  { ID: '1', name: 'Hello', subCategories: [] },
  { ID: '2', name: 'World', subCategories: [] },
];

describe('Search Bar Component', () => {
  beforeEach(() => {
    jest.spyOn(GlobalContext, 'useGlobalStore').mockReturnValue({
      state: { brands: [], categories: mockCategories, cart: [] },
      dispatch: jest.fn,
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SearchBar />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a category button', () => {
    const { asFragment } = render(<SearchBar />);

    const categoryButton = screen.getByRole('button', {
      name: /all categories/i,
    });

    expect(categoryButton).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a category menu when category button is clicked', async () => {
    render(<SearchBar />);

    const categoryButton = screen.getByRole('button', {
      name: /all categories/i,
    });
    await user.click(categoryButton);
    const categoryPopup = screen.getByRole('presentation', {
      name: /category-menu/i,
    });
    const categoryItems = screen.getAllByRole('menuitem');

    expect(categoryPopup).toBeInTheDocument();
    expect(categoryItems).toHaveLength(2);
  });

  it('renders empty input', () => {
    render(<SearchBar />);

    const inputField = screen.getByRole('textbox', { name: /search/i });

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
  });
});

export {};
