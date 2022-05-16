import { InputBase, OutlinedInput, styled } from '@mui/material';

export const SearchField = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: 12,
  minWidth: 400,
  paddingLeft: 0,
  backgroundColor: '#F9F9F9',
  '& .MuiOutlinedInput-input': {
    fontSize: 14,
  },
}));

export const InputField = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(2.5),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 12,
    width: 'auto',
    borderRadius: 12,
    padding: '8px 16px',
  },
}));
