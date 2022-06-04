import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from '../rating';

const user = userEvent.setup();

it('renders checkboxes', () => {
  render(<Rating />);

  const starCheckboxes = screen.getAllByRole('checkbox', { name: /star/i });
  const starImg = screen.getAllByRole('img', { name: /star/i });

  expect(starCheckboxes).toHaveLength(5);
  expect(starImg).toHaveLength(5);

  Array.from(Array(5).keys()).map((item) => {
    const name = new RegExp(`${item + 1} star`, 'i');

    const starCheckbox = screen.getByRole('checkbox', { name });
    const starImg = screen.getByRole('img', { name });

    expect(starCheckbox).toBeInTheDocument();
    expect(starImg).toBeInTheDocument();
  });
});

it('checks the checkboxes when clicked', async () => {
  render(<Rating />);

  const star5 = screen.getByRole('checkbox', { name: /5 star/i });
  expect(star5).not.toBeChecked();

  await user.click(star5);
  expect(star5).toBeChecked();

  await user.click(star5);
  expect(star5).not.toBeChecked();
});

export {};
