import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

const initialFormData = {
  categories: {} as { [key: string]: { [key: string]: boolean } },
  brands: {} as { [key: string]: boolean },
};

type FiltersSection = {
  urlBrands: string[];
  urlCategories: { [key: string]: string[] };
};

export const useFilterData = (params: FiltersSection) => {
  const { urlBrands, urlCategories } = params;
  const [formData, setFormData] = useState(initialFormData);
  const { push } = useRouter();

  useEffect(() => {
    const brandData = {} as { [key: string]: boolean };
    const categories = {} as { [key: string]: { [key: string]: boolean } };

    if (Object.keys(urlCategories).length === 0) return;
    if (urlBrands.length === 0) return;

    Object.keys(urlCategories).forEach((parent) => {
      const child = urlCategories[parent];
      child.forEach((item) => {
        if (categories.hasOwnProperty(parent)) {
          categories[parent][item] = true;
        } else {
          categories[parent] = { [item]: true };
        }
      });
    });

    urlBrands.forEach((item) => {
      if (item) {
        brandData[item] = true;
      }
    });
    setFormData((prev) => ({ ...prev, brands: brandData, categories }));
  }, [urlBrands, urlCategories]);

  const handleCategoryChange = (categoryParams: {
    parent: string;
    values: { [key: string]: boolean };
  }) => {
    const { parent, values } = categoryParams;
    setFormData((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [parent]: {
          ...prev.categories[parent],
          ...values,
        },
      },
    }));
  };

  const handleBrandChange = (data: { [key: string]: boolean }) =>
    setFormData((prev) => ({ ...prev, brands: { ...prev.brands, ...data } }));

  const resetFormData = () => setFormData(initialFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement> | null = null) => {
    e?.preventDefault();
    const { brands, categories } = formData;

    const categoryData = {} as { [key: string]: string[] };
    Object.keys(categories).forEach((parent) => {
      const childCategory = categories[parent];
      const validChild = Object.keys(childCategory).filter(
        (child) => childCategory[child]
      );
      categoryData[parent] = validChild;
    });

    const result = Object.keys(brands)
      .filter((brand) => brands[brand])
      .join(',');

    push(
      {
        pathname: '/',
        query: {
          ...(result && { brands: result }),
          ...(Object.keys(categoryData).length > 0 && {
            categories: JSON.stringify(categoryData),
          }),
        },
      },
      undefined,
      {}
    );
  };

  return {
    formData,
    handleBrandChange,
    handleCategoryChange,
    handleSubmit,
    resetFormData,
  };
};
