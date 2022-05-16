import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import CompareIcon from '@mui/icons-material/Compare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material';
import { Product } from '@/context/initialState';
import { useGlobalStore } from '@/context/GlobalStore';
import { ActionTypes } from '@/context/reducer';
import { FC } from 'react';

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[500],
  paddingTop: 0,
  paddingBottom: 0,
  textTransform: 'capitalize',
  fontSize: 12,
  lineHeight: '20px',
  '& 	.MuiButton-startIcon': {
    '& > svg': {
      color: 'black',
      fontSize: 14,
    },
  },
}));

const QuantityButton = styled(Button)({
  borderRadius: 12,
  textTransform: 'capitalize',
  fontSize: 12,
  lineHeight: '20px',
  backgroundColor: '#f9f9f9',
});

const CustomTableCell = styled(TableCell)({
  borderBottom: 'none',
  paddingLeft: 0,
  paddingTop: 2,
  paddingBottom: 2,
});

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = (props) => {
  const { product } = props;
  const { category, description, image, price, rating, title, quantity } =
    product;
  const { rate } = rating;
  const { dispatch } = useGlobalStore();

  const removeFromCart = () =>
    dispatch({ type: ActionTypes.removeFromCart, payload: product });

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 0,
        }}>
        <Stack direction='row' spacing={2}>
          <Box>
            <Image
              style={{ borderRadius: 8 }}
              src={image}
              width={100}
              height={67}
              alt='some'
              objectFit='cover'
            />
            <Stack
              spacing={0.4}
              alignItems='flex-start'
              justifyContent='space-between'>
              <CustomButton startIcon={<FavoriteBorderIcon />} size='small'>
                Wishlist
              </CustomButton>
              <CustomButton
                startIcon={
                  <CompareIcon
                    sx={(theme) => ({ color: theme.palette.error.light })}
                  />
                }
                size='small'>
                Compare
              </CustomButton>
              <CustomButton
                startIcon={<CloseIcon />}
                size='small'
                onClick={removeFromCart}>
                Remove
              </CustomButton>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
              {title}
            </Typography>
            <Table size='small'>
              <TableBody>
                <TableRow>
                  <CustomTableCell align='left'>
                    <Typography
                      sx={(theme) => ({
                        fontSize: 12,
                        color: theme.palette.grey[500],
                      })}>
                      Category
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography sx={{ fontSize: 12 }}>{category}</Typography>
                  </CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell>
                    <Typography
                      sx={(theme) => ({
                        fontSize: 12,
                        color: theme.palette.grey[500],
                      })}>
                      Description
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
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
                  </CustomTableCell>
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
