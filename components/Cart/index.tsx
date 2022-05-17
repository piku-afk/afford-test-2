import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { useGlobalStore } from '@/context/GlobalStore';
import { FC } from 'react';
import { ProductCard } from './productCard';

type CartProps = {
  id: string;
  anchorElement: Element | null;
  handleClose: () => void;
};

export const Cart: FC<CartProps> = (props) => {
  const { id, anchorElement, handleClose } = props;
  const {
    state: { cart = [] },
  } = useGlobalStore();

  const total = cart
    .reduce((initial, next) => {
      const { price, quantity = 1 } = next;
      return +price * quantity + initial;
    }, 0)
    .toFixed(2);

  const emptyCart = cart.length === 0;

  return (
    <Popover
      id={id}
      open={Boolean(anchorElement)}
      anchorEl={anchorElement}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: 360,
          borderRadius: '8px',
          height: 'calc(100vh - 108px)',
          maxHeight: 920,
          overflow: 'hidden',
        },
      }}>
      <Stack justifyContent='space-between' sx={{ height: '100%' }}>
        <Stack sx={{ height: 'calc(100% - 143px)' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingY: 2.5,
              paddingX: 2,
            }}>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              Shopping Cart
            </Typography>
            <IconButton
              sx={{ marginLeft: 'auto' }}
              size='small'
              onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              paddingX: 2,
              height: 'calc(100% - 74px)',
              overflowY: 'auto',
            }}>
            {emptyCart ? (
              <Typography
                color='InactiveCaptionText'
                align='center'
                fontWeight={500}>
                Empty cart
              </Typography>
            ) : (
              cart.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </Box>
        </Stack>
        <Box
          sx={(theme) => ({
            ...(!emptyCart && { boxShadow: theme.shadows[2] }),
          })}>
          {!emptyCart && (
            <Box sx={{ paddingX: 2, paddingY: 1.6 }}>
              <Typography variant='caption' sx={{ fontWeight: 600 }}>
                Subtotal
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 600 }}>
                {total} USD
              </Typography>
            </Box>
          )}
          <Divider />
          <Box sx={{ paddingX: 2, padding: 1.6 }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Continue Shopping
              </Typography>
              <Button
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontSize: 13,
                }}
                disabled={emptyCart}
                color='secondary'
                variant='contained'
                disableElevation>
                Go to Checkout
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Popover>
  );
};
