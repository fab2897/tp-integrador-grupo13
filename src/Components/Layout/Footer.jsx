import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#1E293B', 
        color: '#94A3B8', 
        py: 2.5, 
        textAlign: 'center',
        mt: 'auto', 
        width: '100%' 
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: '500' }}>
        © {new Date().getFullYear()} Grupo 13. Todos los derechos reservados.
      </Typography>
      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.5 }}>
        Sistema de Gestión y Administración de Clientes — Programación Visual (UNJu)
      </Typography>
    </Box>
  );
};