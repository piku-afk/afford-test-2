import {
  Box,
  ButtonGroup,
  Card,
  Divider,
  Rating,
  Stack,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CompareIcon from '@mui/icons-material/Compare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '@/context/initialState';
import { useGlobalStore } from '@/context/GlobalStore';
import { ActionTypes } from '@/context/reducer';
import { FC } from 'react';
import {
  CartImageContainer,
  CartOptionButton,
  CartTableCell,
  QuantityButton,
  StyledImage,
} from '../StyledMuiComponents';

type ProductCardProps = {
  product: Product;
};

export const useProductCard = (product: Product) => {
  const { dispatch } = useGlobalStore();

  const removeFromCart = () =>
    dispatch({ type: ActionTypes.removeFromCart, payload: product });

  return { removeFromCart };
};

export const ProductCard: FC<ProductCardProps> = (props) => {
  const { product } = props;
  const { category, description, image, price, rating, title, quantity } =
    product;
  const { rate } = rating;
  const { removeFromCart } = useProductCard(product);

  return (
    <>
      <Card
        data-testid='product-card'
        elevation={0}
        sx={{
          borderRadius: 0,
        }}>
        <Stack direction='row' spacing={2}>
          <Box>
            <CartImageContainer>
              <StyledImage
                src={image}
                alt={`${title}'s image`}
                layout='fill'
                objectFit='contain'
                loading='lazy'
              />
            </CartImageContainer>

            <Stack
              spacing={0.4}
              alignItems='flex-start'
              justifyContent='space-between'>
              <CartOptionButton startIcon={<FavoriteBorderIcon />} size='small'>
                Wishlist
              </CartOptionButton>
              <CartOptionButton
                startIcon={
                  <CompareIcon
                    sx={(theme) => ({ color: theme.palette.error.light })}
                  />
                }
                size='small'>
                Compare
              </CartOptionButton>
              <CartOptionButton
                startIcon={<CloseIcon />}
                size='small'
                onClick={removeFromCart}>
                Remove
              </CartOptionButton>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
              {title}
            </Typography>
            <Table size='small'>
              <TableBody>
                <TableRow>
                  <CartTableCell align='left'>
                    <Typography
                      sx={(theme) => ({
                        fontSize: 12,
                        color: theme.palette.grey[500],
                      })}>
                      Category
                    </Typography>
                  </CartTableCell>
                  <CartTableCell>
                    <Typography sx={{ fontSize: 12 }}>{category}</Typography>
                  </CartTableCell>
                </TableRow>
                <TableRow>
                  <CartTableCell>
                    <Typography
                      sx={(theme) => ({
                        fontSize: 12,
                        color: theme.palette.grey[500],
                      })}>
                      Description
                    </Typography>
                  </CartTableCell>
                  <CartTableCell>
                    <Typography
                      sx={{
                        fontSize: 12,
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                      {description}
                    </Typography>
                  </CartTableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Rating
              sx={{
                mt: 0.5,
                '& .MuiRating-icon': { color: 'black', fontSize: 16 },
              }}
              readOnly
              name='product rating'
              size='small'
              value={+rate}
              precision={0.1}
            />
            <Stack direction='row' spacing={2} justifyContent='space-between'>
              <Box>
                <Typography
                  color='secondary'
                  sx={{
                    fontWeight: 500,
                    marginBottom: 0,
                    fontSize: 16,
                    lineHeight: '16px',
                  }}>
                  {price} USD
                </Typography>
                <Typography
                  variant='caption'
                  sx={{
                    marginTop: -2,
                    fontSize: 12,
                    lineHeight: '20px',
                    textDecoration: 'line-through',
                  }}>
                  {+price + 100} USD
                </Typography>
              </Box>
              <Box>
                <ButtonGroup
                  size='small'
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: '12px',
                  })}>
                  <QuantityButton variant='contained' disabled>
                    {quantity}
                  </QuantityButton>
                  <QuantityButton
                    variant='contained'
                    disableElevation
                    disableRipple>
                    Pcs
                  </QuantityButton>
                </ButtonGroup>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Card>
      <Divider sx={{ marginTop: 1, marginBottom: 3 }} />
    </>
  );
};
