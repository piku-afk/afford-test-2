import {
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  withStyles,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useGlobalStore } from '@/context/GlobalStore';

const InputField = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: 12,
  minWidth: 400,
  paddingLeft: 0,
  backgroundColor: '#F9F9F9',
  '& .MuiOutlinedInput-input': {
    fontSize: 14,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  paddingLeft: 16,
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  color: 'black',
  '& .MuiButton-endIcon': {
    color: theme.palette.secondary.main,
  },
}));

const StyledMenuItem = styled(MenuItem)({
  fontSize: 14,
  paddingTop: 6,
  paddingBottom: 6,
});

const CategoryDropdown = () => {
  const {
    state: { categories },
  } = useGlobalStore();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <InputAdornment
      position='start'
      sx={(theme) => ({
        borderRight: `1px solid ${theme.palette.grey[400]}`,
        height: 18,
      })}>
      <StyledButton
        color='secondary'
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        {' '}
        All categories
      </StyledButton>
      <Menu
        id='demo-customized-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          elevation: 0,
          variant: 'outlined',
        }}
        sx={{ '& .MuiMenu-list': { paddingY: 0.5 } }}>
        {categories.map((category) => {
          const { ID, name } = category;

          return (
            <StyledMenuItem key={ID} onClick={handleClose} disableRipple>
              {name}
            </StyledMenuItem>
          );
        })}
      </Menu>
    </InputAdornment>
  );
};

export const SearchBar = () => {
  return (
    <Box sx={{ marginLeft: 'auto', marginRight: 'auto', minWidth: 640 }}>
      <InputField
        placeholder='Search for Products, categories...'
        color='secondary'
        size='small'
        fullWidth
        startAdornment={<CategoryDropdown />}
        endAdornment={
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Box>
  );
};
