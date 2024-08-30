import React from 'react';
import { createBrowserRouter, RouterProvider } from '@tanstack/react-router';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider } from './themeContext'; // Import the custom theme provider
import AppBar from './components/AppBar';
import HomePage from './pages/HomePage';
import CafesPage from './pages/CafesPage';
import EmployeesPage from './pages/EmployeesPage';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/cafes", element: <CafesPage /> },
  { path: "/employees", element: <EmployeesPage /> }
]);

function App() {
  return (
    <ThemeProvider> 
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar /> 
        <RouterProvider router={router} />
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;

