import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importamos tu Provider y el nuevo router de la carpeta rutas
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
        {/* El proveedor nuevo encargado de leer el archivo index.jsx */}
        <RouterProvider router={router} />
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;