import { Button, styled } from '@mui/material';

export const BaseButton = styled(Button)({
  textTransform: 'capitalize',
  borderRadius: 12,
  backgroundColor: 'inherit',
});

export const CartOptionButton = styled(BaseButton)(({ theme }) => ({
  color: theme.palette.grey[500],
  paddingTop: 0,
  paddingBottom: 0,
  fontSize: 12,
  lineHeight: '20px',
  '& 	.MuiButton-startIcon': {
    '& > svg': {
      color: 'black',
      fontSize: 14,
    },
  },
}));

export const DiscountButton = styled(BaseButton)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  zIndex: 100,
  backgroundColor: '#F4F8EC',
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.secondary.main,
  padding: '0 8px',
  '&:hover': {
    backgroundColor: '#F4F8EC',
  },
}));

export const QuantityButton = styled(BaseButton)({
  fontSize: 12,
  lineHeight: '20px',
  backgroundColor: '#f9f9f9',
});

export const SearchButton = styled(BaseButton)(({ theme }) => ({
  paddingLeft: 16,
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8,
  color: 'black',
  '& .MuiButton-endIcon': {
    color: theme.palette.secondary.main,
  },
}));
