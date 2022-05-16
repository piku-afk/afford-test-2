import {
  Checkbox,
  FormControlLabel,
  Stack,
  styled,
  Rating as MuiRating,
} from '@mui/material';
import { FC } from 'react';

const StyledLabel = styled(FormControlLabel)({
  marginLeft: 0,
  '& .MuiFormControlLabel-label': {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
});

const StyledCheckBox = styled(Checkbox)({
  padding: 4,
  '& > svg': { fontSize: 16 },
});

const rating = [5, 4, 3, 2, 1];

export const Rating = () => {
  return (
    <Stack>
      {rating.map((item) => {
        return (
          <StyledLabel
            key={item}
            label={
              <MuiRating
                readOnly
                name={`${item} star rating`}
                size='small'
                value={item}
              />
            }
            control={<StyledCheckBox size='small' color='secondary' />}
          />
        );
      })}
    </Stack>
  );
};
