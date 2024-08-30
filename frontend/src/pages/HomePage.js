import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button, Typography, Box } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Café Employee Manager
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Manage all your café and employee data in one place. Navigate to the sections below to view, add, edit, or delete cafes and employees.
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate('/cafes')}>
        Manage Cafes
      </Button>
      <Button variant="contained" onClick={() => navigate('/employees')}>
        Manage Employees
      </Button>
    </Box>
  );
}

export default HomePage;

