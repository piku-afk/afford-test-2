import { Box, InputAdornment, Menu } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useGlobalStore } from '@/context/GlobalStore';
import { SearchField } from '../StyledMuiComponents/inputField';
import { SearchButton, SearchMenuItem } from '../StyledMuiComponents';

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
      <SearchButton
        id='category-menu-button'
        aria-controls={open ? 'category-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        color='secondary'
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        {' '}
        All categories
      </SearchButton>
      <Menu
        aria-label='category-menu'
        id='category-menu'
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
            <SearchMenuItem key={ID} onClick={handleClose} disableRipple>
              {name}
            </SearchMenuItem>
          );
        })}
      </Menu>
    </InputAdornment>
  );
};

export const SearchBar = () => {
  return (
    <Box sx={{ marginLeft: 'auto', marginRight: 'auto', minWidth: 640 }}>
      <SearchField
        inputProps={{
          'aria-label': 'search',
          name: 'search',
        }}
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
