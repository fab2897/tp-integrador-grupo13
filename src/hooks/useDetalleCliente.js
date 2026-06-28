import { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { obtenerClientePorIdAPI, eliminarClienteAPI } from '../services/clienteService.js';

export const useDetalleCliente = (id, navigate) => {
  const { admin, clientes, eliminarCliente } = useContext(AdminContext);
  
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // el use
  useEffect(() => {
    if (admin?.sector === 'Invitado' || !admin) {
      navigate('/', { replace: true });
    }
  }, [admin, navigate]);
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setLoading(true);
        const clienteLocal = clientes?.find((c) => String(c.id) === String(id));

        if (clienteLocal) {
          setCliente(clienteLocal);
          setError(null);
        } else {
          const data = await obtenerClientePorIdAPI(id);
          setCliente(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) obtenerCliente();
  }, [id, clientes]);

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        await eliminarClienteAPI(cliente.id);
        eliminarCliente(cliente.id);
        alert('Cliente eliminado correctamente');
        navigate('/clientes');
      } catch (error) {
        alert('Error al intentar eliminar el cliente');
      }
    }
  };

  return { cliente, loading, error, admin, handleEliminar };
};