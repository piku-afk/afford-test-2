import { Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FC, useState } from 'react';
import { Category } from '@/context/initialState';
import { BaseButton, CategoryRowMenuItem } from '../StyledMuiComponents';

type CategoryDropdownProps = {
  category: Category;
};

export const CategoryDropdown: FC<CategoryDropdownProps> = (props) => {
  const { category } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { name, subCategories } = category;

  return (
    <>
      <BaseButton
        size='small'
        id='unique-id'
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        {name}
      </BaseButton>
      <Menu
        id='demo-customized-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 0,
          variant: 'outlined',
          style: { marginTop: 8 },
        }}
        sx={{ '& .MuiMenu-list': { paddingY: 0.5 } }}>
        {subCategories.map((category) => {
          const { ID, name } = category;

          return (
            <CategoryRowMenuItem key={ID} onClick={handleClose} disableRipple>
              {name}
            </CategoryRowMenuItem>
          );
        })}
      </Menu>
    </>
  );
};
