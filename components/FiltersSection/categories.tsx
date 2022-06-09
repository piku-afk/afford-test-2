import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { CategoryCheckBox, StyledLabel } from '../StyledMuiComponents';
import { useCategories } from '@/hooks/useCategories';

type CategoriesProps = {
  value: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
  handleChange: (params: {
    parent: string;
    values: { [key: string]: boolean };
  }) => void;
};

export const Categories: FC<CategoriesProps> = (props) => {
  const { value, handleChange } = props;
  const { categories, handleCheckAll, handleCheckBoxChange } =
    useCategories(handleChange);

  return (
    <Stack sx={{ paddingLeft: 1 }} spacing={1}>
      {categories.map((category) => {
        const { ID, name: parentCategory, subCategories } = category;
        const values = Object.values(value[parentCategory] || {}) || [];
        const parentCheck = values.length > 0 && values.some((value) => value);

        return (
          <Box key={ID}>
            <StyledLabel
              label={parentCategory}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontWeight: parentCheck ? 600 : 'inherit',
                },
              }}
              control={
                <CategoryCheckBox
                  size='small'
                  color='secondary'
                  checked={parentCheck}
                  onChange={(e) =>
                    handleCheckAll(
                      e.target.checked,
                      parentCategory,
                      subCategories.map(({ name }) => name)
                    )
                  }
                />
              }
            />
            <Stack sx={{ ml: 3 }}>
              {subCategories.map((category) => {
                const { ID, name } = category;
                const { [name]: checked = false } = value[parentCategory] || {};

                return (
                  <StyledLabel
                    key={ID}
                    label={name}
                    control={
                      <CategoryCheckBox
                        size='small'
                        color='secondary'
                        checked={checked}
                        onChange={(e) =>
                          handleCheckBoxChange(
                            name,
                            Boolean(e.target.value),
                            parentCategory
                          )
                        }
                      />
                    }
                  />
                );
              })}
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
};
