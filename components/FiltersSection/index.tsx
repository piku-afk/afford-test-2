import { useFilterData } from '@/hooks/useFilterData';
import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { BaseButton } from '../StyledMuiComponents';
import { Brands } from './brands';
import { Categories } from './categories';
import { Price } from './price';
import { Rating } from './rating';
import { FormSection } from './section';

interface FiltersSectionProps {
  urlBrands: string[];
  urlCategories: { [key: string]: string[] };
}

export const FiltersSection: FC<FiltersSectionProps> = (props) => {
  const { urlBrands, urlCategories } = props;

  const {
    formData,
    handleBrandChange,
    handleCategoryChange,
    handleSubmit,
    resetFormData,
  } = useFilterData({
    urlBrands,
    urlCategories,
  });

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
