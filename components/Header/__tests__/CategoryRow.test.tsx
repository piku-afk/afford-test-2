import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as GlobalContext2 from '@/context/GlobalStore';
import { CategoryRow } from '../categoryRow';
import { mockCategories } from '@/utils/testData';

const user = userEvent.setup();

describe('CategoryRow', () => {
  beforeEach(() => {
    jest.spyOn(GlobalContext2, 'useGlobalStore').mockImplementation(() => ({
      state: { categories: mockCategories, brands: [], cart: [] },
      dispatch: jest.fn(),
    }));
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<CategoryRow />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders different category buttons', () => {
    render(<CategoryRow />);

    const categoryButtons = screen.getAllByRole('button');
    const helloButton = screen.getByRole('button', { name: /hello/i });
    const worldButton = screen.getByRole('button', { name: /world/i });

    expect(categoryButtons).toHaveLength(2);
    expect(helloButton).toBeInTheDocument();
    expect(worldButton).toBeInTheDocument();
  });

  it('renders a popup showing sub-categories', async () => {
    render(<CategoryRow />);

    const helloButton = screen.getByRole('button', { name: /hello/i });
    await user.click(helloButton);

    const categoryPopup = screen.getByRole('presentation');
    const subCategoryButtons = screen.getAllByRole('menuitem');

    expect(categoryPopup).toBeInTheDocument();
    expect(subCategoryButtons).toHaveLength(2);
  });
});

export {};
