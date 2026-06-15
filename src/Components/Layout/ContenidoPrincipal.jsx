import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Navbar'; 
import { Footer } from './Footer';

export const ContenidoPrincipal = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     
      <Header />
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 4, 
          backgroundColor: '#E5E7EB', 
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Outlet /> 
      </Box>
      <Footer />
    </Box>
  );
};