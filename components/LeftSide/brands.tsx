import { Stack } from '@mui/material';
import { FC } from 'react';
import { useGlobalStore } from '@/context/GlobalStore';
import { BrandCheckBox, BrandLabel } from '../StyledMuiComponents';

type BrandsProps = {
  value: { [key: string]: boolean };
  handleChange: (data: { [key: string]: boolean }) => void;
};

export const Brands: FC<BrandsProps> = (props) => {
  const { handleChange, value } = props;
  const {
    state: { brands: brands },
  } = useGlobalStore();

  return (
    <Stack sx={{ mt: 1, ml: -0.5 }} spacing={0.5}>
      {brands.map((brand) => {
        const { ID, name } = brand;
        const checked = value[name] || false;

        return (
          <BrandLabel
            key={ID}
            label={name}
            control={
              <BrandCheckBox
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
