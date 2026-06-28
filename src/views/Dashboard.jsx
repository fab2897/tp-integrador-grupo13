import React, { useContext } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { AdminContext } from '../context/AdminContext.jsx';

const Dashboard = () => {
  
  const { clientes } = useContext(AdminContext);

  
const totalClientes = clientes ? clientes.length : 0;

const nuevosEsteMes = clientes ? clientes.filter(cliente => cliente.id > 10).length : 0;

  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      
      <Typography variant="h4" className="titulo-subrayado" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 5 }}>
        Resumen General
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        
        <Paper className="tarjeta-animada" sx={{ p: 4, borderTop: '5px solid #1E293B', borderRadius: 2, minWidth: '280px' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Total Clientes
          </Typography>
          
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {totalClientes}
          </Typography>
        </Paper>

        <Paper className="tarjeta-animada" sx={{ p: 4, borderTop: '5px solid #0284C7', borderRadius: 2, minWidth: '280px' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nuevos este mes
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            {nuevosEsteMes}
          </Typography>
        </Paper>

      </Box>
    </Box>
  );
};

export default Dashboard;