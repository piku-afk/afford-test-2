import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { useFilterData } from '../useFilterData';
import { useRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '@/utils/testData';

const mockCategories = { hello: { world: true } };
const mockBrands = { tesla: true };

// This way of mocking is not working,
// Error: "Cannot destructure property 'push'"
// const push = jest.fn();
// jest.spyOn(NextRouter, 'useRouter').mockReturnValue({ push } as any);

// mocking call for useRouter
const router = createMockRouter({});
const renderFilterDataHook = (
  urlBrands: string[] = [],
  urlCategories: { [key: string]: string[] } = {}
) => {
  const wrapper: any = ({ children }: { children: any }) => (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );

  return renderHook(() => useFilterData({ urlBrands, urlCategories }), {
    wrapper,
  });
};

describe('Hook: useFilterData', () => {
  it('should have default values', () => {
    const { result } = renderFilterDataHook();

    expect(result.current.formData).toMatchObject({
      brands: {},
      categories: {},
    });
  });

  it('runs different handler correctly', () => {
    const { result } = renderFilterDataHook();

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
    const { result } = renderFilterDataHook(['tesla'], {
      hello: ['world'],
    });
    expect(result.current.formData).toEqual({
      categories: { hello: { world: true } },
      brands: { tesla: true },
    });
  });

  it('runs push from useRouter in handleSubmit', () => {
    const { result } = renderFilterDataHook(['hello', 'world'], {
      hello: ['world'],
    });

    act(() => {
      result.current.handleCategoryChange({
        parent: 'hello',
        values: { world: true },
      });
      result.current.handleBrandChange(mockBrands);
      result.current.handleSubmit();
    });

    expect(router.push).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/',
        query: {
          brands: 'hello,world',
          categories: JSON.stringify({ hello: ['world'] }),
        },
      }),
      undefined,
      {}
    );
  });
});
