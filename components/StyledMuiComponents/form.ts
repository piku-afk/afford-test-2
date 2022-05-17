import {
  Checkbox,
  FormControlLabel,
  InputLabel as MuiInputLabel,
  Slider,
  styled,
} from '@mui/material';

export const BrandLabel = styled(FormControlLabel)({
  marginLeft: 0,
  '& .MuiFormControlLabel-label': {
    fontSize: 14,
  },
});

// this label is to be used with InputField defined in inputField.ts
export const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const RatingLabel = styled(FormControlLabel)({
  marginLeft: 0,
  '& .MuiFormControlLabel-label': {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
});

export const StyledLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    fontSize: 14,
  },
});

export const CategoryCheckBox = styled(Checkbox)({
  padding: 4,
  '& > svg': { fontSize: 14 },
});

export const BrandCheckBox = styled(Checkbox)({
  padding: 4,
  '& > svg': { fontSize: 16 },
});

export const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.secondary.main}`,
    // border: `1px solid red`,
  },
}));
