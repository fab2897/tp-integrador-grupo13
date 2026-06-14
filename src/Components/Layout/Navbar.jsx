import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Box sx={{ bgcolor: 'secondary.main', p: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
      
      <Button component={Link} to="/" sx={{ color: 'white', fontWeight: 'bold' }}>
        Menu
      </Button>
      
      <Button component={Link} to="/clientes" sx={{ color: 'white', fontWeight: 'bold' }}>
        Lista de Clientes
      </Button>
      
      <Button component={Link} to="/login" sx={{ color: 'white', fontWeight: 'bold' }}>
        Perfil 
      </Button>
      
    </Box>
  );
};