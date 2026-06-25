import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


import { AdminProvider } from './context/AdminContext.jsx';
import { router } from './routes/routes.jsx';

const theme = createTheme({
  palette: {
    primary: { main: '#1E293B' },
    secondary: { main: '#0284C7' },
    background: { default: '#E5E7EB' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider>
        <RouterProvider router={router} />
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;;