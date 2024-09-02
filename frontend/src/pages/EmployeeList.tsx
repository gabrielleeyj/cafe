import React from 'react';
import { Link } from '@tanstack/react-router';
import { Box, Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid2';


function EmployeesList({ data, isLoading, error, onEdit }) {
  const columns = [
    { field: 'id', headerName: 'Employee ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email_address', headerName: 'Email Address' },
    { field: 'phone_number', headerName: 'Phone Number' },
    { field: 'days_worked', headerName: 'Days Worked' },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params) => (
        <React.Fragment>
          <Button startIcon={<EditIcon />} onClick={() => handleOpen(params.data)} color="primary">
            Edit
          </Button>
          <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(params.data.id)} color="secondary">
            Delete
          </Button>
        </React.Fragment>
      )
    }];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return <div>No employees found</div>;

  return (
    <Box sx={{ my: 4 }}>
      <h1>{data.cafe} Employees</h1>
      <Grid container spacing={2}>
      <Grid size={12}>
      <Link to='/cafes'>
        <Button variant="outlined">Back</Button>
      </Link>
      </Grid>
      <Grid size={12}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        domLayout='autoHeight'
        />
        </Grid>
        </Grid>
    </Box>

  );
}

export default EmployeesList;

