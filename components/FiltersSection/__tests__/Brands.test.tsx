import * as GlobalContext from '@/context/GlobalStore';
import { mockBrands } from '@/utils/testData';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Brands } from '../brands';

const user = userEvent.setup();
const handleChange = jest.fn();

const MockBrands = () => (
  <Brands value={{ hello: true }} handleChange={handleChange} />
);

describe('Brands', () => {
  beforeEach(() => {
    jest.spyOn(GlobalContext, 'useGlobalStore').mockReturnValue({
      state: { brands: mockBrands, categories: [], cart: [] },
      dispatch: jest.fn,
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<MockBrands />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a checkboxes correctly', () => {
    render(<MockBrands />);

    const brandCheckboxes = screen.getAllByRole('checkbox');
    const helloCheckbox = screen.getByRole('checkbox', { name: /hello/i });
    const worldCheckbox = screen.getByRole('checkbox', { name: /world/i });

    expect(brandCheckboxes).toHaveLength(2);
    expect(helloCheckbox).toBeInTheDocument();
    expect(helloCheckbox).toBeChecked();
    expect(worldCheckbox).toBeInTheDocument();
    expect(worldCheckbox).not.toBeChecked();
  });

  it('renders checkboxes correctly when clicked', async () => {
    render(<MockBrands />);

    const helloCheckbox = screen.getByRole('checkbox', { name: /hello/i });
    const worldCheckbox = screen.getByRole('checkbox', { name: /world/i });

    await user.click(helloCheckbox);
    await user.click(worldCheckbox);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});

export {};
