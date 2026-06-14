import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  CssBaseline, 
  Paper
} from '@mui/material';


const Inicio = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Bienvenido a la página de Inicio</Typography>
    <Typography variant="body1">Este es el contenido dinámico de la primera ruta.</Typography>
  </Box>
);

const Proyectos = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Sección de Proyectos</Typography>
    <Typography variant="body1">Aquí irán las tablas o tarjetas de tu proyecto final.</Typography>
  </Box>
);

const Perfil = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Mi Perfil</Typography>
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="body1">Nombre de usuario: Administrador</Typography>
    </Paper>
  </Box>
);

const PaginaNoEncontrada = () => (
  <Box textAlign="center" mt={5}>
    <Typography variant="h3" color="error">404</Typography>
    <Typography variant="h5">Página no encontrada</Typography>
  </Box>
);


function LayoutBase() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
      <CssBaseline /> 

    
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Proyecto Final
          </Typography>
          
          
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/proyectos">Proyectos</Button>
          <Button color="inherit" component={Link} to="/perfil">Perfil</Button>
        </Toolbar>
      </AppBar>

    
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
      
        <Outlet /> 
      </Container>

     
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: (theme) => theme.palette.grey[200] 
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Grupo 13. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<LayoutBase />}>
          
          
          <Route index element={<Inicio />} />
          
         
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="perfil" element={<Perfil />} />
          
          
          <Route path="*" element={<PaginaNoEncontrada />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}