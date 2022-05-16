import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '76.27%',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 12,
}));

export const StyledImage = styled(Image)({
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
});
