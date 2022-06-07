import * as GlobalContext from '@/context/GlobalStore';
import { mockBrands } from '@/utils/testData';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Brands } from '../brands';

const user = userEvent.setup();

jest
  .spyOn(GlobalContext, 'useGlobalStore')
  .mockReturnValue({
    state: { brands: mockBrands, categories: [], cart: [] },
    dispatch: jest.fn,
  });

const MockBrands = () => {
  const [mockValue, setMockValue] = useState({ hello: true });

  const handleChange = (data: { [key: string]: boolean }) =>
    setMockValue((prev) => ({ ...prev, ...data }));

  return <Brands value={mockValue} handleChange={handleChange} />;
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
