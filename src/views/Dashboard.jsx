import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      
      <Typography variant="h4" className="titulo-subrayado" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 5 }}>
        Resumen General
      </Typography>

      
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 4, 
          flexWrap: 'wrap' 
        }}
      >
        
        {/* Tarjeta 1 */}
        <Paper className="tarjeta-animada" sx={{ p: 4, borderTop: '5px solid #1E293B', borderRadius: 2, minWidth: '280px' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Total Clientes
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            142
          </Typography>
        </Paper>

        {/* Tarjeta 2 */}
        <Paper className="tarjeta-animada" sx={{ p: 4, borderTop: '5px solid #0284C7', borderRadius: 2, minWidth: '280px' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nuevos este mes
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            12
          </Typography>
        </Paper>

      </Box>
    </Box>
  );
};

export default Dashboard;