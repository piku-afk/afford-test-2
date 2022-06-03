import { useGlobalStore } from '@/context/GlobalStore';
import { Product } from '@/context/initialState';
import { ActionTypes } from '@/context/reducer';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import {
  DiscountButton,
  ImageContainer,
  StyledImage,
} from '../StyledMuiComponents';

type ProductListProps = {
  products: Product[];
};

export const ProductList: FC<ProductListProps> = (props) => {
  const { products } = props;
  const { dispatch } = useGlobalStore();

  const handleAddToCart = (product: Product) =>
    dispatch({ type: ActionTypes.addToCart, payload: product });

  return (
    <Grid container columnSpacing={4} rowSpacing={6} style={{ marginTop: -40 }}>
      {products.map((product) => {
        const { description, id, image, title, rating, price } = product;
        const { rate = 0 } = rating || {};
        const discount = Math.round((1 - +price / (+price + 100)) * 100);

        return (
          <Grid key={id} item xs={4}>
            <Card
              data-testid='product-card'
              variant='outlined'
              sx={{ borderRadius: '12px', height: '100%' }}>
              <CardContent style={{ padding: 16, height: '100%' }}>
                <ImageContainer>
                  <DiscountButton
                    disableRipple
                    disableElevation
                    color='secondary'
                    variant='contained'
                    size='small'>
                    -{discount}%
                  </DiscountButton>
                  <StyledImage
                    src={image}
                    alt={`${title}'s image`}
                    layout='fill'
                    objectFit='contain'
                    loading='lazy'
                  />
                </ImageContainer>
                <Box sx={{ mt: 1 }}>
                  <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
                  <Typography
                    component='p'
                    variant='caption'
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                    {description}
                  </Typography>

                  <Rating
                    size='medium'
                    readOnly
                    value={+rate}
                    precision={0.1}
                    sx={{
                      my: 1,
                      '& .MuiRating-icon': { color: 'black', fontSize: 20 },
                    }}
                  />
                </Box>
                <Stack direction='row' justifyContent='space-between'>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }} color='secondary'>
                      {price} USD
                    </Typography>
                    <Typography component='p' variant='caption'>
                      {+price + 100} USD
                    </Typography>
                  </Box>
                  <Button
                    style={{
                      borderRadius: 12,
                      padding: '7px 12px',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                    color='secondary'
                    variant='contained'
                    disableElevation
                    onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
