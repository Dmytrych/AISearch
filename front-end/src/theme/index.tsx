import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#646cff', // A deep blue color for primary elements
      light: '#63a4ff', // Lighter shade of blue
      dark: '#004ba0', // Darker shade of blue
    },
    secondary: {
      main: '#ff6f00', // An orange color for secondary elements
      light: '#ff9e40', // Lighter shade of orange
      dark: '#c43e00', // Darker shade of orange
    },
    background: {
      paper: '#f5f5f5', // Light gray background color
      default: '#ffffff'
    },
    error: {
      main: '#f44336', // Red color for error messages
      light: '#ff7961', // Lighter shade of red
      dark: '#ba000d', // Darker shade of red
    },
    success: {
      main: '#4caf50', // Green color for success messages
      light: '#81c784', // Lighter shade of green
      dark: '#388e3c', // Darker shade of green
    },
    info: {
      main: '#2196f3', // Blue color for informational messages
      light: '#64b5f6', // Lighter shade of blue
      dark: '#1976d2', // Darker shade of blue
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem', // Large headings
      fontWeight: '700',
    },
    h2: {
      fontSize: '2rem', // Medium headings
      fontWeight: '700',
    },
    h3: {
      fontSize: '1.5rem', // Small headings
      fontWeight: '700',
    },
    h4: {
      fontSize: '1.2rem', // Extra-small headings
      fontWeight: '700',
    },
    subtitle1: {
      fontSize: '1rem', // Regular subtitle,
      fontWeight: '500',
    },
    subtitle2: {
      fontSize: '0.9rem', // Small subtitle
      fontWeight: '500',
    },
    body1: {
      fontSize: '1rem', // Regular text size
      fontWeight: '400',
    },
    body2: {
      fontSize: '0.9rem', // Small text size
      fontWeight: '400',
    },
    button: {
      fontSize: '1rem', // Button text size
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.8rem', // Caption text size
      fontWeight: '500',
    },
    overline: {
      fontSize: '0.8rem', // Overline text size
      textTransform: 'uppercase',
      fontWeight: '400',
    },
  },
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
