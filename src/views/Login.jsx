import React, { useState, useContext } from 'react';
import { Box, Typography, Paper, TextField, Button, Avatar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext.jsx';
import { LISTA_USUARIOS } from '../data/usuarios.js'; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AdminContext); 
  
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!correo || !contra) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // list
    const usuarioEncontrado = LISTA_USUARIOS.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contra === contra
    );

    if (!usuarioEncontrado) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

  
    const usuarioLogueado = { 
      name: usuarioEncontrado.nombre, 
      sector: usuarioEncontrado.sector,
      rol: usuarioEncontrado.rol,
      imagen: usuarioEncontrado.imagen
    };

    login(usuarioLogueado); 
    navigate('/');
  };

  const handleInvitado = () => {
    //invitado
    const invitadoUser = { name: 'Invitado', sector: 'Ninguno', rol: 'Invitado', imagen: null };
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
            id="correo"
            label="Correo Electrónico"
            name="correo"
            type="email"
            autoFocus
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            inputProps={{ maxLength: 35 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="contra"
            label="Contraseña"
            name="contra"
            type="password"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
            inputProps={{ maxLength: 15 }}
          />
          
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