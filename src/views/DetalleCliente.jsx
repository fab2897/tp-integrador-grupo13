import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Card, CardContent, Divider, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdminContext } from '../context/AdminContext.jsx';
import { CLIENTES_SIMULADOS } from './ListaClientes.jsx'; 

const DetalleCliente = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext); 

 //mantener este ussefect porff
  useEffect(() => {
    if (admin?.rol === 'Invitado') {
      navigate('/', { replace: true });
    }
  }, [admin, navigate]);
//hasta aca

  const cliente = CLIENTES_SIMULADOS.find(c => c.id === parseInt(id));
  if (admin?.rol === 'Invitado' || !cliente) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Cliente no encontrado o acceso no autorizado.</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/clientes')} sx={{ mt: 2 }}>
          Volver a la lista
        </Button>
      </Box>
    );
  }

  const handleEliminar = () => {
    alert(`Petición HTTP DELETE simulada con éxito para el cliente ID: ${cliente.id}`);
    navigate('/clientes');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/clientes')} 
        sx={{ mb: 2, textTransform: 'none' }}
      >
        Volver a la lista
      </Button>

      <Card component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#1E293B' }}>
            Ficha Profunda del Cliente #{cliente.id}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Usuario de Sistema: {cliente.username}
          </Typography>
          
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Nombre Completo:</strong> {cliente.name.firstname} {cliente.name.lastname}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {cliente.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Teléfono:</strong> {cliente.phone}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}>
            Dirección de Envío
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Calle:</strong> {cliente.address.street} {cliente.address.number}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Ciudad:</strong> {cliente.address.city} (CP: {cliente.address.zipcode})
          </Typography>

          <Divider sx={{ my: 2 }} />

          //SECTOR DE PERMISOSSSSS
          {admin?.sector === 'Gerencia' ? (
            <Box sx={{ mt: 3, textAlign: 'right' }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleEliminar}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                Eliminar Cliente de la Base de Datos
              </Button>
            </Box>
          ) : (
            <Alert severity="info" sx={{ mt: 3 }}>
              Tu usuario sector <strong>{admin?.sector || 'Invitado'}</strong> solo tiene permisos de lectura.
            </Alert>
          )}

        </CardContent>
      </Card>
    </Box>
  );
};

export default DetalleCliente;