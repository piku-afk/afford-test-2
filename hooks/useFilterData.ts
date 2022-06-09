import { useEffect, useState } from 'react';

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

  const handleCategoryChange = (params: {
    parent: string;
    values: { [key: string]: boolean };
  }) => {
    const { parent, values } = params;
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

  return { formData, handleBrandChange, handleCategoryChange, resetFormData };
};
