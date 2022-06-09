import { renderHook, act } from '@testing-library/react-hooks';
import { useProductCard } from '../productCard';
import { mockProducts } from '@/utils/testData';
import * as GlobalContext from '@/context/GlobalStore';
import { ActionTypes } from '@/context/reducer';

const dispatch = jest.fn();
const product = mockProducts[0];

describe('Hook: useProductCard', () => {
  beforeEach(() => {
    jest.spyOn(GlobalContext, 'useGlobalStore').mockReturnValue({
      state: { categories: [], brands: [], cart: [] },
      dispatch,
    });
  });

  it('returns and calls a function', () => {
    const { result } = renderHook(() => useProductCard(product));

    act(() => {
      result.current.removeFromCart();
    });

    expect(typeof result.current.removeFromCart).toBe('function');
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ActionTypes.removeFromCart,
        payload: product,
      })
    );
  });
});
