import { useGlobalStore } from '@/context/GlobalStore';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  styled,
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, FC, useState } from 'react';

const StyledLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    fontSize: 14,
  },
});

const StyledCheckBox = styled(Checkbox)({
  padding: 4,
  '& > svg': { fontSize: 14 },
});

type Props = {
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

export const Categories: FC<Props> = (props) => {
  const { value, handleChange } = props;
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
                <StyledCheckBox
                  size='small'
                  color='secondary'
                  checked={parentCheck}
                  onChange={(e) =>
                    handleCheckAll(
                      e,
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
                      <StyledCheckBox
                        size='small'
                        color='secondary'
                        checked={checked}
                        onChange={(e) =>
                          handleChange({
                            parent: parentCategory,
                            values: { [name]: e.target.checked },
                          })
                        }
                        // indeterminate={checked[0] !== checked[1]}
                        // onChange={handleCheckAll}
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
