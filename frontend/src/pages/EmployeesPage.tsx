import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useEmployees } from '../hooks/useEmployees.jsx';
import { AgGridReact } from 'ag-grid-react';
import { Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function EmployeesPage() {
  const { employeesQuery } = useEmployees();
  const { data: employees, isLoading, error, refetch } = employeesQuery;
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'Employee ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email_address', headerName: 'Email Address' },
    { field: 'phone_number', headerName: 'Phone Number' },
    { field: 'days_worked', headerName: 'Days Worked' },
    { field: 'cafe', headerName: 'Café Name' },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params) => (
        <React.Fragment>
          <Button startIcon={<EditIcon />} onClick={() => navigate(`/employees/edit/${params.data.id}`)} color="primary">
            Edit
          </Button>
          <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(params.data.id)} color="secondary">
            Delete
          </Button>
        </React.Fragment>
      )
    }];

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this employee?');
    if (confirm) {
      await fetch(`http://localhost:3000/employees/${id}`, { method: 'DELETE' });
      refetch(); // Re-fetch the data after deletion
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!employees) return <div>No employees found</div>;  // Ensure employees is not undefined or null

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2} className="ag-theme-quartz">
        <Grid size={12}>
          <Button variant="contained" onClick={() => navigate('/employees/new')}>Add New Employee</Button>
        </Grid>
        <Grid size={12}>
        <AgGridReact
          rowData={employees || []}
          columnDefs={columns}
          domLayout='autoHeight'
        />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmployeesPage;

