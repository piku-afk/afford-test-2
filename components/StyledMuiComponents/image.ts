import { Box, styled } from '@mui/material';
import Image from 'next/image';

const BaseContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 12,
}));

export const ImageContainer = styled(BaseContainer)({
  paddingTop: '76.27%',
});

export const CartImageContainer = styled(BaseContainer)({
  paddingTop: '67%',
  marginBottom: 16,
});

export const StyledImage = styled(Image)({
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
});
