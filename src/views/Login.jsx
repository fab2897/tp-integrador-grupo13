import React, { useState, useContext } from 'react';
import { Box, Typography, Paper, TextField, Button, Avatar, Alert, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AdminContext); 
  
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !sector) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const usuarioLogueado = { 
      name: nombre, 
      sector: sector,
      rol: sector 
    };
    login(usuarioLogueado); 
    navigate('/');
  };

  const handleInvitado = () => {
    const invitadoUser = { name: 'Invitado', sector: 'Ninguno', rol: 'Invitado' };
    login(invitadoUser); 
    navigate('/');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#0F172A'
      }}
    >
      <Paper elevation={4} sx={{ p: 5, width: '100%', maxWidth: 400, borderRadius: 3, textAlign: 'center' }}>
        
        <Avatar sx={{ m: '0 auto', mb: 2, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Iniciar Sesión
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          AdminClientes — Grupo 13
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre del Administrador"
            name="nombre"
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            inputProps={{ maxLength: 50 }}
          />

          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="sector"
            label="Sector / Rol"
            name="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <MenuItem value="Soporte">Soporte</MenuItem>
            <MenuItem value="Gerencia">Gerencia</MenuItem>
          </TextField>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 1.5, py: 1.2, fontSize: '1rem', textTransform: 'none', fontWeight: 'bold' }}
          >
            Entrar
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleInvitado}
            sx={{ py: 1.2, fontSize: '1rem', textTransform: 'none', fontWeight: 'bold' }}
          >
            Ingresar como Invitado
          </Button>
          
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;