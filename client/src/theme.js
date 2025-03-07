import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // Purple
      light: '#9c4dcc',
      dark: '#38006b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b6b', // Coral
      light: '#ff9e9b',
      dark: '#c73e3e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '8px 24px',
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(106, 27, 154, 0.2)',
        },
        containedSecondary: {
          boxShadow: '0 4px 10px rgba(255, 107, 107, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;