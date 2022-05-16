import { Badge, styled } from '@mui/material';

export const CartCountBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    backgroundColor: '#E5704B',
    color: 'white',
    fontSize: 12,
    minWidth: 0,
    lineHeight: '20px',
    // height: 'fit-content',
  },
});
