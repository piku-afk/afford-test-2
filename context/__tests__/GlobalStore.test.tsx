import { render } from '@testing-library/react';
import { GlobalStore } from '../GlobalStore';
import { ActionTypes } from '../reducer';
import { act } from 'react-test-renderer';

const dispatch = jest.fn();

jest.mock('react', () => {
  const original = jest.requireActual('react'); // Step 2.
  return {
    ...original,
    useReducer: () => [{}, dispatch],
  };
});

describe('GlobalStore', () => {
  let originalFetch: any;
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            searchFilter: { brands: [], categories: [] },
          }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it('fetches data initially', async () => {
    // render(<GlobalStore />);
    await act(async () => render(<GlobalStore />));

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/filters');

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ActionTypes.setCategories,
        payload: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ActionTypes.setBrands,
        payload: [],
      })
    );
  });
});
