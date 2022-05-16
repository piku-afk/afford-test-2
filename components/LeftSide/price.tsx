import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  Slider,
  Stack,
  styled,
} from '@mui/material';
import { useState } from 'react';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.secondary.main}`,
    // border: `1px solid red`,
  },
}));

const Separator = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontWeight: 500,
  position: 'absolute',
  top: '50%',
  left: '48.5%',
  translate: 'transform(-50%, -50%)',
  marginLeft: 0,
}));

const StyledLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(2.5),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 12,
    width: 'auto',
    borderRadius: 12,
    padding: '8px 16px',
  },
}));

export const Price = () => {
  const [value, setValue] = useState<number[]>([20, 60]);

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box>
      <StyledSlider
        // size='small'
        color='secondary'
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
      />
      <Stack direction='row' spacing={4} sx={{ position: 'relative' }}>
        <FormControl size='small' variant='standard' color='secondary'>
          <StyledLabel shrink>Min</StyledLabel>
          <StyledInput
            type='number'
            inputProps={{ min: 0 }}
            value={value[0]}
            onChange={(e) => setValue((prev) => [+e.target.value, prev[1]])}
          />
        </FormControl>
        <FormControl size='small' variant='standard' color='secondary'>
          <StyledLabel shrink>Max</StyledLabel>
          <StyledInput
            value={value[1]}
            onChange={(e) => setValue((prev) => [prev[0], +e.target.value])}
          />
        </FormControl>
        <Separator style={{ marginLeft: 0 }}>-</Separator>
      </Stack>
    </Box>
  );
};
