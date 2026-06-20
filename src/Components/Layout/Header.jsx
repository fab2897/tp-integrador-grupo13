import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { AdminContext } from '../../context/AdminContext.jsx'; 

export const Header = () => {
  const { admin, logout } = useContext(AdminContext);
  const name = admin?.name || "Usuario";
  const sector = admin?.sector || "Soporte";

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1E293B', elevation: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SupervisorAccountIcon sx={{ mr: 1, color: 'white' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            AdminClientes - Grupo 13
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          
          <Avatar 
            src={admin?.imagen} 
            sx={{ 
              bgcolor: '#0284C7', 
              width: 36, 
              height: 36,
              fontSize: '0.95rem',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            {name.charAt(0)}
          </Avatar>

          <Typography variant="body2" sx={{ color: 'white', textAlign: 'right' }}>
            <strong>{name}</strong> ({sector})
          </Typography>

          <Button 
            variant="contained" 
            color="error" 
            size="small" 
            onClick={logout} 
            sx={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: '#d32f2f' }}
          >
            Cerrar Sesión
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};