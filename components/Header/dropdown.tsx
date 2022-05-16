import { Button, Menu, MenuItem } from '@mui/material';
import { FC, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/system';
import { Category } from '@/context/initialState';

const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 12,
  backgroundColor: 'inherit',
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: 13,
  paddingTop: 4,
  paddingBottom: 4,
});

type Props = {
  category: Category;
};
export const CategoryDropdown: FC<Props> = (props) => {
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
      <StyledButton
        size='small'
        id='unique-id'
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        {name}
      </StyledButton>
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
            <StyledMenuItem key={ID} onClick={handleClose} disableRipple>
              {name}
            </StyledMenuItem>
          );
        })}
      </Menu>
    </>
  );
};
