import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlobalContext } from '@/context/GlobalStore';
import { CategoryRow } from '../categoryRow';

const user = userEvent.setup();

const MockComponent = () => {
  const mockCategories = [
    {
      ID: '1',
      name: 'Hello',
      subCategories: [
        { ID: '1', name: 'Piyush', subCategories: [] },
        { ID: '2', name: 'Mahato', subCategories: [] },
      ],
    },
    { ID: '2', name: 'World', subCategories: [] },
  ];

  return (
    <GlobalContext.Provider
      value={{
        state: { categories: mockCategories, brands: [], cart: [] },
        dispatch: () => {},
      }}>
      <CategoryRow />
    </GlobalContext.Provider>
  );
};

it('renders different category buttons', () => {
  render(<MockComponent />);

  const categoryButtons = screen.getAllByRole('button');
  const helloButton = screen.getByRole('button', { name: /hello/i });
  const worldButton = screen.getByRole('button', { name: /world/i });

  expect(categoryButtons).toHaveLength(2);
  expect(helloButton).toBeInTheDocument();
  expect(worldButton).toBeInTheDocument();
});

it('renders a popup showing sub-categories', async () => {
  render(<MockComponent />);

  const helloButton = screen.getByRole('button', { name: /hello/i });
  await user.click(helloButton);

  const categoryPopup = screen.getByRole('presentation');
  const subCategoryButtons = screen.getAllByRole('menuitem');

  expect(categoryPopup).toBeInTheDocument();
  expect(subCategoryButtons).toHaveLength(2);
});

export {};
