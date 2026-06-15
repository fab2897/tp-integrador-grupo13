import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export const Header = () => {
  // Datos temporales
  const adminName = "Valentin"; 
  const adminSector = "Soporte"; 

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1E293B', elevation: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Titulo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SupervisorAccountIcon sx={{ mr: 1, color: 'white' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            AdminClientes - Grupo 13
          </Typography>
        </Box>

        {/* Foto de Perfil y Botón */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          
          {/*foto de perfil */}
          <Avatar 
            sx={{ 
              bgcolor: '#0284C7',
              width: 36, 
              height: 36,
              fontSize: '0.95rem',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            {adminName.charAt(0)} {/* inicial*/}
          </Avatar>

          <Typography variant="body2" sx={{ color: 'white', textAlign: 'right' }}>
            <strong>{adminName}</strong> ({adminSector})
          </Typography>

          <Button 
            variant="contained" 
            color="error" 
            size="small" 
            sx={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: '#d32f2f' }}
          >
            Cerrar Sesión
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};