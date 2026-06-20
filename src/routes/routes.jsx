import React, { useContext } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext.jsx';

import { ContenidoPrincipal } from '../Components/Layout/ContenidoPrincipal.jsx';
import Dashboard from '../views/Dashboard.jsx';
import Login from '../views/Login.jsx';
import ListaClientes from '../views/ListaClientes.jsx';
import DetalleCliente from '../views/DetalleCliente.jsx';

const RutaProtegida = () => {
  const { admin } = useContext(AdminContext);
  return admin ? <Outlet /> : <Navigate to="/login" replace />;
};
const RutaPublica = () => {
  const { admin } = useContext(AdminContext);
  return !admin ? <Login /> : <Navigate to="/" replace />;
};
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <RutaPublica />
  },
  {
    element: <RutaProtegida />,
    children: [
      {
        element: <ContenidoPrincipal />,
        children: [
          {
            path: '/',
            element: <Dashboard />
          },
          {
            path: '/clientes',
            element: <ListaClientes />
          },
          {
            path: '/clientes/:id',
            element: <DetalleCliente />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);