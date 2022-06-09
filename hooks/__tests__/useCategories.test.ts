import { renderHook, act } from '@testing-library/react-hooks';
import { useCategories } from '../useCategories';

const handleChange = jest.fn();

describe('Hook: useCategories', () => {
  it('returns different properties', () => {
    const { result } = renderHook(() => useCategories(handleChange));

    expect(typeof result.current.categories).toBe('object');
    expect(typeof result.current.handleCheckAll).toBe('function');
    expect(typeof result.current.handleCheckBoxChange).toBe('function');
  });

  it('calls handleChange in handleCheckAll', () => {
    const { result } = renderHook(() => useCategories(handleChange));

    act(() => {
      result.current.handleCheckAll(true, 'hello', ['world', 'test']);
    });

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        parent: 'hello',
        values: { world: true, test: true },
      })
    );
  });

  it('calls handleChange in handleCheckBoxChange', () => {
    const { result } = renderHook(() => useCategories(handleChange));

    act(() => {
      result.current.handleCheckBoxChange('world', false, 'hello');
    });

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        parent: 'hello',
        values: { world: false },
      })
    );
  });
});
