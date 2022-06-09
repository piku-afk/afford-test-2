import * as GlobalContext from '@/context/GlobalStore';
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
    ID: '2',
    name: 'second category',
    subCategories: [{ ID: '2', name: 'sub cat', subCategories: [] }],
  },
];

const handleChange = jest.fn();

const MockCategory = () => {
  return (
    <Categories
      value={{ hello: { world: true } }}
      handleChange={handleChange}
    />
  );
};

describe('Cart', () => {
  beforeEach(() => {
    jest.spyOn(GlobalContext, 'useGlobalStore').mockReturnValue({
      state: { brands: [], categories: mockCategories, cart: [] },
      dispatch: jest.fn,
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<MockCategory />);

    expect(asFragment()).toMatchSnapshot();
  });

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
    const subCatCheckBox = screen.getByRole('checkbox', {
      name: /sub cat/i,
    });

    await user.click(helloCheckBox);
    await user.click(subCatCheckBox);
    await user.click(worldCheckBox);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});

export {};
