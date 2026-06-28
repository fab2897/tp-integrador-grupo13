import React, { createContext, useState, useEffect } from 'react';
import { obtenerClientesAPI } from '../services/clienteService'; 

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  });

  const login = (userData) => {
    setAdmin(userData);
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('userSession');
  };
    //localstorgae con persistencia en los clientes(no me acuerdo si dijo que se tenia que mantener con f5)
  const [clientes, setClientes] = useState(() => {
    const clientesLocales = localStorage.getItem('clientesLocal');
    return clientesLocales ? JSON.parse(clientesLocales) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarClientesIniciales = async () => {
      const clientesLocales = localStorage.getItem('clientesLocal');
      if (clientesLocales) return; 
      try {
        setLoading(true);
        const datos = await obtenerClientesAPI();
        setClientes(datos);
        localStorage.setItem('clientesLocal', JSON.stringify(datos));
        setError(null);
      } catch (err) {
        setError('Error al obtener los clientes. Verifique su conexión.');
      } finally {
        setLoading(false);
      }
    };

    cargarClientesIniciales();
  }, []);
const crearCliente = (nuevoCliente) => {
    setClientes((prevClientes) => {
      const actualizados = [...prevClientes, nuevoCliente];
      localStorage.setItem('clientesLocal', JSON.stringify(actualizados));
      return actualizados;
    });
  };
  const eliminarCliente = (id) => {
    setClientes((prevClientes) => {
      const actualizados = prevClientes.filter((c) => c.id !== id);
      localStorage.setItem('clientesLocal', JSON.stringify(actualizados));
      return actualizados;
    });
  };

  return (
    <AdminContext.Provider 
      value={{ 
        admin, 
        login, 
        logout, 
        clientes,
        loading,  
        error,  
        crearCliente,   
        eliminarCliente 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};