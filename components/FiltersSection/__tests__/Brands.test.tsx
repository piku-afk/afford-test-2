import { GlobalContext } from '@/context/GlobalStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Brands } from '../brands';

const user = userEvent.setup();

const MockBrands = () => {
  const [mockValue, setMockValue] = useState({ hello: true });
  const mockBrands = [
    { ID: '1', name: 'hello' },
    { ID: '2', name: 'world' },
  ];
  const handleChange = (data: { [key: string]: boolean }) =>
    setMockValue((prev) => ({ ...prev, ...data }));

  return (
    <GlobalContext.Provider
      value={{
        state: { brands: mockBrands, categories: [], cart: [] },
        dispatch: () => {},
      }}>
      <Brands value={mockValue} handleChange={handleChange} />
    </GlobalContext.Provider>
  );
};

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
  expect(helloCheckbox).not.toBeChecked();

  await user.click(worldCheckbox);
  expect(worldCheckbox).toBeChecked();
});

export {};
