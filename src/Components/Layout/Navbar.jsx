import React from 'react';
import { Box, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box 
      sx={{ 
        backgroundColor: '#0284C7', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 4, 
        py: 1,
        width: '100%' 
      }}
    >
      {/* menuu*/}
      <Button
        color="inherit"
        startIcon={<DashboardIcon />}
        onClick={() => navigate('/')}
        sx={{
          textTransform: 'none',
          color: 'white',
          fontSize: '0.95rem',
          fontWeight: location.pathname === '/' ? 'bold' : 'normal',
          borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
          borderRadius: 0,
          px: 1
        }}
      >
        MENU
      </Button>

      {/* Botón clientess*/}
      <Button
        color="inherit"
        startIcon={<PeopleIcon />}
        onClick={() => navigate('/clientes')}
        sx={{
          textTransform: 'none',
          color: 'white',
          fontSize: '0.95rem',
          fontWeight: location.pathname.startsWith('/clientes') ? 'bold' : 'normal',
          borderBottom: location.pathname.startsWith('/clientes') ? '2px solid white' : 'none',
          borderRadius: 0,
          px: 1
        }}
      >
        LISTA DE CLIENTES
      </Button>

      {/*boton perfill*/}
      <Button
        color="inherit"
        startIcon={<PersonIcon />}
        sx={{
          textTransform: 'none',
          color: 'white',
          fontSize: '0.95rem',
          fontWeight: 'normal',
          borderRadius: 0,
          px: 1
        }}
      >
        PERFIL
      </Button>
    </Box>
  );
};