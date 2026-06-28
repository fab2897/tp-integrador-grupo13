import React, { useState, useContext } from 'react';
import { 
  Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, TextField, Grid, Snackbar, Alert 
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AdminContext } from '../context/AdminContext.jsx'; 
import { crearClienteAPI } from '../services/clienteService.js'; 

export default function FormularioCliente() {
  
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: '' });
  const { crearCliente,clientes } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    email: '', username: '', password: '', firstname: '', lastname: '',
    phone: '', city: '', street: '', number: '', zipcode: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ email: '', username: '', password: '', firstname: '', lastname: '', phone: '', city: '', street: '', number: '', zipcode: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'firstname' || name === 'lastname') {
      const soloLetras = value.replace(/[^A-Za-zÁéíóúÁÉÍÓÚñÑ ]/g, '');
      setFormData({ ...formData, [name]: soloLetras });
      return;
    }

    if (name === 'phone') {
      const soloTel = value.replace(/[^0-9\- ]/g, '');
      setFormData({ ...formData, [name]: soloTel });
      return;
    }

    if (name === 'zipcode') {
      const soloNumerosZip = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: soloNumerosZip });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
    e.preventDefault(); 

    const maxId = clientes.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const nuevoId = maxId + 1;

    const clienteAEnviar = {
      id: nuevoId, 
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname
      },
      address: {
        city: formData.city,
        street: formData.street,
        number: parseInt(formData.number) || 0,
        zipcode: formData.zipcode,
        geolocation: { lat: '-31.4135', long: '-64.1810' }
      },
      phone: formData.phone
    };

    try {
      await crearClienteAPI(clienteAEnviar);

      crearCliente(clienteAEnviar);

      setSnackbar({
        open: true,
        mensaje: `¡Cliente creado con éxito! ID local asignado: ${nuevoId}`
      });
      
      handleClose(); 
    } catch (error) {
      console.error("Error en la petición POST:", error);
      alert("Error al intentar crear el cliente.");
    }
  };
  return (
    <>
      <Button 
        variant="contained" 
        color="success" 
        startIcon={<PersonAddIcon />}
        onClick={handleOpen}
        sx={{ fontWeight: 'bold' }}
      >
        Agregar Nuevo Cliente
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
          Registrar Nuevo Cliente en el Sistema
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              
              {/* DATOS PERSONALES */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  name="firstname"
                  fullWidth
                  required
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido"
                  name="lastname"
                  fullWidth
                  required
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teléfono"
                  name="phone"
                  fullWidth
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej: 388-1234567"
                />
              </Grid>

              {/* CREDENCIALES DE CUENTA */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre de Usuario"
                  name="username"
                  fullWidth
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  name="password"
                  type="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>

              {/* DIRECCIÓN */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ciudad"
                  name="city"
                  fullWidth
                  required
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Calle"
                  name="street"
                  fullWidth
                  required
                  value={formData.street}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Altura/Número"
                  name="number"
                  type="number" 
                  fullWidth
                  required
                  value={formData.number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Código Postall"
                  name="zipcode"
                  fullWidth
                  required
                  value={formData.zipcode}
                  onChange={handleChange} 
                />
              </Grid>

            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancelar
            </Button>
            <Button type="submit" color="success" variant="contained">
              Guardar Cliente
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={5000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>
    </>
  );
}