import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, TextField, Button, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { AdminContext } from '../context/AdminContext.jsx'; 


export const CLIENTES_SIMULADOS = [
  {
    id: 1,
    name: { firstname: 'Valentin', lastname: 'Estrada' },
    email: 'valentin@mail.com',
    phone: '388-1234567',
    address: { city: 'Jujuy', street: 'Belgrano', number: 450, zipcode: '4600' },
    username: 'valen_admin'
  },
  {
    id: 2,
    name: { firstname: 'Gonzalo', lastname: 'Perez' },
    email: 'gonzalo@mail.com',
    phone: '388-7654321',
    address: { city: 'Palpalá', street: 'San Martin', number: 120, zipcode: '4612' },
    username: 'gonza_dev'
  }
];
const ListaClientes = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext); 
  const [busqueda, setBusqueda] = useState('');
  const [openModal, setOpenModal] = useState(false); 

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoApellido, setNuevoApellido] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');

  const clientesFiltrados = CLIENTES_SIMULADOS.filter(cliente => {
    const termino = busqueda.toLowerCase();
    const apellido = cliente.name.lastname.toLowerCase();
    const ciudad = cliente.address.city.toLowerCase();
    return apellido.includes(termino) || ciudad.includes(termino);
  });

  const handleGuardarCliente = (e) => {
    e.preventDefault();
    alert(`Cliente registrado exitosamente (Simulación POST). ID asignado: ${CLIENTES_SIMULADOS.length + 1}`);
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E293B' }}>
          Panel de Clientes
        </Typography>
        {/* PERMISO DE NUEVO CLIENTE */}
        {admin?.rol !== 'Invitado' && (
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
          >
            Nuevo Cliente
          </Button>
        )}
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        label="Buscar cliente por apellido o ciudad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ mb: 3, backgroundColor: '#FFFFFF' }}
      />

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
                  {/* PERMISO DE VER FICHA*/}
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

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Dar de Alta Cliente</DialogTitle>
        <Box component="form" onSubmit={handleGuardarCliente}>
          <DialogContent display="flex" flexDirection="column" gap={2}>
            <TextField label="Nombre" fullWidth required margin="dense" value={nuevoNombre} onChange={(e)=>setNuevoNombre(e.target.value)} />
            <TextField label="Apellido" fullWidth required margin="dense" value={nuevoApellido} onChange={(e)=>setNuevoApellido(e.target.value)} />
            <TextField label="Email" type="email" fullWidth required margin="dense" value={nuevoEmail} onChange={(e)=>setNuevoEmail(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Guardar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ListaClientes;