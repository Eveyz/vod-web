import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    custom: {
      light: '#D61F28',
      main: '#D61F28',
      dark: '#D61F28',
    },
    header: {
      light: '#34495e',
      main: '#34495e',
      dark: '#34495e',
    },
    white: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
    }
  },
  status: {
    danger: orange[500],
  },
});

export default theme