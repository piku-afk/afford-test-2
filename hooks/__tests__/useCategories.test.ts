import { renderHook } from '@testing-library/react-hooks';
import { useCategories } from '../useCategories';

const handleChange = jest.fn();

describe('Hook: useCategories', () => {
  it('returns different properties', () => {
    const { result } = renderHook(() => useCategories(handleChange));

    expect(typeof result.current.categories).toBe('object');
    expect(typeof result.current.handleCheckAll).toBe('function');
    expect(typeof result.current.handleCheckBoxChange).toBe('function');
  });
});
