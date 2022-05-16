import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useGlobalStore } from '@/context/GlobalStore';
import { SearchBar } from './searchBar';
import { CategoryRow } from './categoryRow';
import { useState } from 'react';
import { Cart } from '../Cart';
import { ParentWrapper } from '@/layouts/wrapper';

const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    backgroundColor: '#E5704B',
    color: 'white',
    fontSize: 12,
    minWidth: 0,
    lineHeight: '20px',
    // height: 'fit-content',
  },
});

export const Header = () => {
  const {
    state: { cart = [] },
  } = useGlobalStore();

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const showCart = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorElement(e.currentTarget);
  const hideCart = () => setAnchorElement(null);

  return (
    <Box>
      <AppBar
        // @ts-ignore
        disableGutters
        component={ParentWrapper}
        maxWidth='xl'
        position='static'
        elevation={0}>
        <Toolbar
          sx={{ paddingY: 4 }}
          style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 600,
            }}>
            Sample Ecom
          </Typography>
          <SearchBar />
          <Box>
            <IconButton size='large'>
              <PersonOutlinedIcon />
            </IconButton>
            <IconButton
              aria-describedby='show-cart'
              size='large'
              sx={{ marginLeft: 1 }}
              onClick={showCart}>
              <StyledBadge
                badgeContent={cart.length}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}>
                <ShoppingBagOutlinedIcon />
              </StyledBadge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CategoryRow />
      <Cart
        id='show-cart'
        anchorElement={anchorElement}
        handleClose={hideCart}
      />
    </Box>
  );
};
