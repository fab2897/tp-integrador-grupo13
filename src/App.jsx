import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AdminProvider, AdminContext } from './context/AdminContext.jsx';
import { ContenidoPrincipal } from './Components/Layout/ContenidoPrincipal.jsx';

import Dashboard from './views/Dashboard.jsx';
import Login from './views/Login.jsx';
import ListaClientes from './views/ListaClientes.jsx';
import DetalleCliente from './views/DetalleCliente.jsx';

const theme = createTheme({
  palette: {
    primary: { main: '#1E293B' },
    secondary: { main: '#0284C7' },
    background: { default: '#E5E7EB' },
  },
});

const RutaProtegida = () => {
  const { admin } = useContext(AdminContext);
  return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path="/login" element={<Login />} />

            <Route element={<RutaProtegida />}>
              <Route element={<ContenidoPrincipal />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clientes" element={<ListaClientes />} />
                <Route path="/clientes/:id" element={<DetalleCliente />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;