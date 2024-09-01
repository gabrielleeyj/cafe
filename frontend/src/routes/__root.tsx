import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { useTheme } from '../styles/themeContext.jsx';


export const Route = createRootRoute({
  component: App,
})

function App() {
  const { toggleTheme } = useTheme();
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Café Employee Manager
          </Typography>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Home</Link>
          <Link to="/cafes" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Cafes</Link>
          <Link to="/employees" style={{ color: 'inherit', textDecoration: 'none', margin: '0 10px' }}>Employees</Link>
          <Switch onChange={toggleTheme} />
        </Toolbar>
      </AppBar>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
