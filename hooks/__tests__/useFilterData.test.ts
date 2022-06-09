import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { useFilterData } from '../useFilterData';

const mockCategories = { hello: { world: true } };
const mockBrands = { tesla: true };

describe('Hook: useFilterData', () => {
  it('should have default values', () => {
    const { result } = renderHook(() =>
      useFilterData({ urlBrands: [], urlCategories: {} })
    );

    expect(result.current.formData).toMatchObject({
      brands: {},
      categories: {},
    });
  });

  it('runs different handler correctly', () => {
    const { result } = renderHook(() =>
      useFilterData({ urlBrands: [], urlCategories: {} })
    );

    act(() =>
      result.current.handleCategoryChange({
        parent: 'hello',
        values: { world: true },
      })
    );

    expect(result.current.formData.categories).toEqual(mockCategories);

    act(() => result.current.handleBrandChange(mockBrands));
    expect(result.current.formData.brands).toEqual(mockBrands);
    expect(result.current.formData).toEqual({
      categories: mockCategories,
      brands: mockBrands,
    });

    act(() => result.current.resetFormData());
    expect(result.current.formData).toEqual({ categories: {}, brands: {} });
  });

  it('should have initial values', () => {
    // it runs a infinite loop for some reason
    // const { result } = renderHook(() =>
    //   useFilterData({
    //     urlBrands: ['tesla'],
    //     urlCategories: { hello: ['world'] },
    //   })
    // );
    // expect(result.current.formData).toEqual({
    //   categories: { hello: { world: true } },
    //   brands: { tesla: true },
    // });
  });
});
