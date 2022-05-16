import { useGlobalStore } from '@/context/GlobalStore';
import { Brand } from '@/context/initialState';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { FC, useEffect, useState } from 'react';

const StyledLabel = styled(FormControlLabel)({
  marginLeft: 0,
  '& .MuiFormControlLabel-label': {
    fontSize: 14,
  },
});

const StyledCheckBox = styled(Checkbox)({
  padding: 4,
  '& > svg': { fontSize: 16 },
});

type Props = {
  urlBrands: string[];
  value: { [key: string]: boolean };
  handleChange: (data: { [key: string]: boolean }) => void;
};

export const Brands: FC<Props> = (props) => {
  const { handleChange, value, urlBrands } = props;
  const {
    state: { brands: brands },
  } = useGlobalStore();

  // const [brands, setBrands] = useState<Brand[]>([]);

  // useEffect(() => {
  //   const found: string[] = [];
  //   globalBrands.forEach((item) => {
  //     const { name } = item;
  //     if (urlBrands.includes(name)) {
  //       found.push(name);
  //     }
  //   });
  //   const notFoundBrands = urlBrands
  //     .map((item) => {
  //       if (found.includes(item)) return null;
  //       return { ID: item, name: item };
  //     })
  //     .filter((item) => item) as Brand[];
  //   console.log(notFoundBrands);
  //   setBrands([...notFoundBrands, ...globalBrands]);
  // }, [globalBrands, urlBrands]);

  // console.log(urlBrands);

  return (
    <Stack sx={{ mt: 1, ml: -0.5 }} spacing={0.5}>
      {brands.map((brand) => {
        const { ID, name } = brand;
        const checked = value[name] || false;

        return (
          <StyledLabel
            key={ID}
            label={name}
            control={
              <StyledCheckBox
                size='small'
                color='secondary'
                checked={checked}
                onChange={(e) => handleChange({ [name]: e.target.checked })}
              />
            }
          />
        );
      })}
    </Stack>
  );
};
