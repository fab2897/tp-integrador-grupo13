import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';

import { Header } from './Components/Layout/Header.jsx';
import { Navbar } from './Components/Layout/Navbar.jsx';
import { Footer } from './Components/Layout/Footer.jsx';

import Dashboard from './views/Dashboard.jsx';
import Login from './views/Login.jsx';
import ListaClientes from './views/ListaClientes.jsx';
import DetalleCliente from './views/DetalleCliente.jsx';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1E293B', // Azul marino
    },
    secondary: {
      main: '#0284C7', // Celeste
    },
    background: {
      default: '#e0e1e2', // Fondo gris clarito
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      
      <BrowserRouter>
       
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <Header />
          <Navbar />

      
          <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/clientes" element={<ListaClientes />} />
              <Route path="/clientes/:id" element={<DetalleCliente />} />
            </Routes>
          </Container>

          <Footer />
          
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;