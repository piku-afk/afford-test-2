import { GlobalContext } from '@/context/GlobalStore';
import { useState } from 'react';
import { Categories } from '../categories';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const user = userEvent.setup();
const mockCategories = [
  {
    ID: '1',
    name: 'hello',
    subCategories: [{ ID: '2', name: 'world', subCategories: [] }],
  },
  {
    ID: '1',
    name: 'second category',
    subCategories: [{ ID: '2', name: 'sub cat', subCategories: [] }],
  },
];

const MockCategory = () => {
  const [mockValue, setMockValue] = useState<{
    [key: string]: {
      [key: string]: boolean;
    };
  }>({ hello: { world: true } });

  const handleCategoryChange = (params: {
    parent: string;
    values: { [key: string]: boolean };
  }) => {
    const { parent, values } = params;
    setMockValue((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        ...values,
      },
    }));
  };

  return (
    <GlobalContext.Provider
      value={{
        dispatch: () => {},
        state: { brands: [], cart: [], categories: mockCategories },
      }}>
      <Categories value={mockValue} handleChange={handleCategoryChange} />
    </GlobalContext.Provider>
  );
};

it('renders the checkboxes correctly', () => {
  render(<MockCategory />);

  const helloCheckBox = screen.getByRole('checkbox', { name: /hello/i });
  expect(helloCheckBox).toBeInTheDocument();
  expect(helloCheckBox).toBeChecked();

  const worldCheckBox = screen.getByRole('checkbox', {
    name: /world/i,
  });
  expect(worldCheckBox).toBeInTheDocument();
  expect(worldCheckBox).toBeChecked();

  const secondCheckBox = screen.getByRole('checkbox', {
    name: /second category/i,
  });
  expect(secondCheckBox).toBeInTheDocument();
  expect(secondCheckBox).not.toBeChecked();

  const subCatCheckBox = screen.getByRole('checkbox', {
    name: /sub cat/i,
  });
  expect(subCatCheckBox).toBeInTheDocument();
  expect(subCatCheckBox).not.toBeChecked();
});

it('renders the checkboxes correctly when clicked', async () => {
  render(<MockCategory />);

  const helloCheckBox = screen.getByRole('checkbox', { name: /hello/i });
  const worldCheckBox = screen.getByRole('checkbox', {
    name: /world/i,
  });
  const secondCheckBox = screen.getByRole('checkbox', {
    name: /second category/i,
  });
  const subCatCheckBox = screen.getByRole('checkbox', {
    name: /sub cat/i,
  });

  await user.click(helloCheckBox);
  expect(helloCheckBox).not.toBeChecked();
  expect(worldCheckBox).not.toBeChecked();

  await user.click(subCatCheckBox);
  expect(secondCheckBox).toBeChecked();
  expect(subCatCheckBox).toBeChecked();
});

export {};
