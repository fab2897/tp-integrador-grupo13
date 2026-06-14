import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 3, 
        textAlign: 'center',
        mt: 'auto' 
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Grupo 13. Todos los derechos reservados.
      </Typography>
      <Typography variant="caption" sx={{ color: 'grey.400' }}>
        Sistema de Gestión y Administración de Clientes
      </Typography>
    </Box>
  );
};