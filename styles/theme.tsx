import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#fff' },
    secondary: { main: '#6A983C' },
    text: { primary: '#151515' },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'sans-serif'",
  },
});
