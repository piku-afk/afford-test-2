import { useFilterData } from '@/hooks/useFilterData';
import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { FC, FormEvent } from 'react';
import { BaseButton } from '../StyledMuiComponents';
import { Brands } from './brands';
import { Categories } from './categories';
import { Price } from './price';
import { Rating } from './rating';
import { FormSection } from './section';

type FiltersSection = {
  urlBrands: string[];
  urlCategories: { [key: string]: string[] };
};

export const FiltersSection: FC<FiltersSection> = (props) => {
  const { urlBrands, urlCategories } = props;
  const { push } = useRouter();
  const { formData, handleBrandChange, handleCategoryChange, resetFormData } =
    useFilterData({
      urlBrands,
      urlCategories,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { brands, categories } = formData;

    const categoryData = {} as { [key: string]: string[] };
    Object.keys(categories).map((parent) => {
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

  return (
    <Box sx={{ width: 264 }}>
      <form onSubmit={handleSubmit}>
        <FormSection label='Categories'>
          <Categories
            value={formData.categories || {}}
            handleChange={handleCategoryChange}
          />
        </FormSection>

        <FormSection label='Brands'>
          <Brands value={formData.brands} handleChange={handleBrandChange} />
        </FormSection>

        <FormSection label='Rating'>
          <Rating />
        </FormSection>

        <FormSection label='Price'>
          <Price />
        </FormSection>

        <Stack direction='row' spacing={1}>
          <Button
            size='small'
            color='secondary'
            type='submit'
            variant='contained'
            sx={{ borderRadius: '12px' }}
            disableElevation>
            Apply
          </Button>
          <BaseButton
            sx={(theme) => ({ color: theme.palette.text.primary })}
            onClick={resetFormData}>
            Reset
          </BaseButton>
        </Stack>
      </form>
    </Box>
  );
};
