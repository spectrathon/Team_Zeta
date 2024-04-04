"use client";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5', // Primary color
    },
    secondary: {
      main: '#f50057', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Default font family
  },
});

export default theme;
