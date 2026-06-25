import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, TextField, Button, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AdminContext } from '../context/AdminContext.jsx';
//esto era profe
import FormularioCliente from './FormularioCliente.jsx';


const ListaClientes = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);
  
  // ESTADOS OBLIGATORIOS PARA CONTROLAR LA CARGA DE DATOS, ERRORES Y FILTRADO
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Petición asincrónica FakeStoreAPI
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setLoading(true); // Estado: Cargando pa
        const respuesta = await fetch('https://fakestoreapi.com/users');
        
        if (!respuesta.ok) {
            throw new Error('Error de red al intentar obtener los clientes.');
        }
        
        const datos = await respuesta.json();
        setClientes(datos); // Estado: Exito pa
        setError(null);
      } catch (error) {
        setError('Error al obtener los clientes. Por favor, verifique su conexión a la API.'); // Estado: Error
      } finally {
        setLoading(false);
      }
    };

    obtenerClientes();
  }, []);

  // Buscador dinamico por apellido o ciudad
  const clientesFiltrados = clientes.filter(cliente => {
    const termino = busqueda.toLowerCase();
    const apellido = cliente.name.lastname.toLowerCase();
    const ciudad = cliente.address.city.toLowerCase();
    return apellido.includes(termino) || ciudad.includes(termino);
  });

  return (
    <Box sx={{ p: 3 }}>
       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>

      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E293B', mb: 3 }}>
        Panel de Clientes
      </Typography>
      {admin?.rol !== 'Invitado' && <FormularioCliente />}

      </Box>
      <TextField
        fullWidth
        variant="outlined"
        label="Buscar cliente por apellido o ciudad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ mb: 3, backgroundColor: '#FFFFFF' }}
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1E293B' }}>
              <TableRow>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>Nombre Completo</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>Teléfono</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold' }}>Ciudad</TableCell>
                <TableCell sx={{ color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientesFiltrados.map((cliente) => (
                <TableRow key={cliente.id} hover>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{`${cliente.name.firstname} ${cliente.name.lastname}`}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.phone}</TableCell>
                  <TableCell>{cliente.address.city}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {admin?.rol !== 'Invitado' ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/clientes/${cliente.id}`)}
                      >
                        Ver Ficha Completa
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Sin acceso
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ListaClientes;