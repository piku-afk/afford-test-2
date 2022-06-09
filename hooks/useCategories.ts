import { useGlobalStore } from '@/context/GlobalStore';
import { ChangeEvent } from 'react';

export const useCategories = (
  handleChange: (params: {
    parent: string;
    values: { [key: string]: boolean };
  }) => void
) => {
  const {
    state: { categories },
  } = useGlobalStore();

  const handleCheckAll = (
    e: ChangeEvent<HTMLInputElement>,
    parent: string,
    children: string[]
  ) => {
    const value = e.target.checked;
    const newValues = {} as { [key: string]: boolean };
    children.forEach((child) => (newValues[child] = value));
    handleChange({ parent, values: newValues });
  };

  const handleCheckBoxChange = (
    name: string,
    value: boolean,
    parentCategory: any
  ) =>
    handleChange({
      parent: parentCategory,
      values: { [name]: value },
    });

  return { categories, handleCheckAll, handleCheckBoxChange };
};
