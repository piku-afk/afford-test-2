import { Box, FormControl, Stack, styled } from '@mui/material';
import { useState } from 'react';
import { InputField, InputLabel, StyledSlider } from '../StyledMuiComponents';

const Separator = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontWeight: 500,
  position: 'absolute',
  top: '50%',
  left: '48.5%',
  translate: 'transform(-50%, -50%)',
  marginLeft: 0,
}));

export const Price = () => {
  const [value, setValue] = useState<number[]>([20, 60]);

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box>
      <StyledSlider
        color='secondary'
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
      />
      <Stack direction='row' spacing={4} sx={{ position: 'relative' }}>
        <FormControl size='small' variant='standard' color='secondary'>
          <InputLabel shrink>Min</InputLabel>
          <InputField
            type='number'
            inputProps={{ min: 0 }}
            value={value[0]}
            onChange={(e) => setValue((prev) => [+e.target.value, prev[1]])}
          />
        </FormControl>
        <FormControl size='small' variant='standard' color='secondary'>
          <InputLabel shrink>Max</InputLabel>
          <InputField
            value={value[1]}
            onChange={(e) => setValue((prev) => [prev[0], +e.target.value])}
          />
        </FormControl>
        <Separator style={{ marginLeft: 0 }}>-</Separator>
      </Stack>
    </Box>
  );
};
