import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { BaseButton } from '../StyledMuiComponents';
import { Brands } from './brands';
import { Categories } from './categories';
import { Price } from './price';
import { Rating } from './rating';
import { FormSection } from './section';

const initialFormData = {
  categories: {} as { [key: string]: { [key: string]: boolean } },
  brands: {} as { [key: string]: boolean },
};

type LeftSideProps = {
  urlBrands: string[];
  urlCategories: { [key: string]: string[] };
};

export const LeftSide: FC<LeftSideProps> = (props) => {
  const { urlBrands, urlCategories } = props;
  const [formData, setFormData] = useState(initialFormData);
  const { push } = useRouter();

  useEffect(() => {
    const brandData = {} as { [key: string]: boolean };
    const categories = {} as { [key: string]: { [key: string]: boolean } };

    Object.keys(urlCategories).map((parent) => {
      const child = urlCategories[parent];
      child.map((item) => {
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
            onClick={() => setFormData(initialFormData)}>
            Reset
          </BaseButton>
        </Stack>
      </form>
    </Box>
  );
};
