import { Stack, Rating as MuiRating } from '@mui/material';
import { BrandCheckBox, RatingLabel } from '../StyledMuiComponents';

const rating = [5, 4, 3, 2, 1];

export const Rating = () => {
  return (
    <Stack>
      {rating.map((item) => {
        return (
          <RatingLabel
            key={item}
            label={
              <MuiRating
                readOnly
                name={`${item} star rating`}
                size='small'
                value={item}
              />
            }
            control={<BrandCheckBox size='small' color='secondary' />}
          />
        );
      })}
    </Stack>
  );
};
