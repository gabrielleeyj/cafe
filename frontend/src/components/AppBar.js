import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useTheme } from '../themeContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Café Employee Manager
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/cafes')}>Cafes</Button>
        <Button color="inherit" onClick={() => navigate('/employees')}>Employees</Button>
        <Switch onChange={toggleTheme} /> 
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

