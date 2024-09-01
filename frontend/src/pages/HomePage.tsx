import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Typography, Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';

function HomePage() {

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }} gutterBottom>
              Welcome to the Café Employee Manager
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
              Manage all your café and employee data in one place. Navigate to the sections below to view, add, edit, or delete cafes and employees.
            </Typography>
          </Grid>
          <Grid size={6} sx={{ textAlign: 'center' }}>
            <Link to="/cafes" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>
              <Button variant="contained" sx={{ mb: 2, alignItems: 'center', textAlign: 'center' }}>
                Manage Cafes
              </Button>
            </Link>
          </Grid>
          <Grid size={6} sx={{ textAlign: 'center' }}>
            <Link to="/employees" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>
              <Button variant="contained" sx={{ mb: 2, alignItems: 'center', textAlign: 'center' }}>
                Manage Employees
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;

