import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useEmployees } from '../hooks/useEmployees';
import { AgGridReact } from 'ag-grid-react';
import { Button, Box, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function EmployeesPage() {
  const { data: employees, isLoading, error, refetch } = useEmployees();
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'Employee ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email_address', headerName: 'Email Address' },
    { field: 'phone_number', headerName: 'Phone Number' },
    { field: 'days_worked', headerName: 'Days Worked' },
    { field: 'cafe_name', headerName: 'Café Name' },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <React.Fragment>
          <Button startIcon={<EditIcon />} onClick={() => navigate(`/employees/edit/${params.data.id}`)} color="primary">
            Edit
          </Button>
          <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(params.data.id)} color="secondary">
            Delete
          </Button>
        </React.Fragment>
      )
    }
  ];

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this employee?');
    if (confirm) {
      await fetch(`http://localhost:3000/employees/${id}`, { method: 'DELETE' });
      refetch(); // Re-fetch the data after deletion
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Box sx={{ my: 4 }}>
      <Button variant="contained" onClick={() => navigate('/employees/new')}>Add New Employee</Button>
      <Container>
        <AgGridReact
          rowData={employees}
          columnDefs={columns}
          domLayout='autoHeight'
        />
      </Container>
    </Box>
  );
}

export default EmployeesPage;

