import React, { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useCafes } from '../hooks/useCafes';
import { AgGridReact } from 'ag-grid-react';
import { Button, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmployeeForm from '../components/EmployeeForm';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function EmployeesPage() {
  const { cafesQuery } = useCafes();
  const { data: cafes } = cafesQuery;
  const { employeesQuery, deleteEmployeeMutation, createEmployeeMutation, updateEmployeeMutation } = useEmployees();
  const { data: employees, isLoading, error, refetch } = employeesQuery;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

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
          <Button startIcon={<EditIcon />} onClick={() => handleOpen(params.data)} color="primary">
            Edit
          </Button>
          <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(params.data.id)} color="secondary">
            Delete
          </Button>
        </React.Fragment>
      )
    }];

  const handleEdit = (data: object) => {
    updateEmployeeMutation.mutate({ employee: data });
    refetch();
    setOpenDialog(false);
  };

  const handleNew = (values: object) => {
    createEmployeeMutation.mutate(values);
    refetch();
    setOpenDialog(false);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this employee?');
    if (confirm) {
      deleteEmployeeMutation.mutate({ id: id });
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
          <Button variant="contained" onClick={() => handleOpen()}>Add New Employee</Button>
        </Grid>
        <Grid size={12}>
          <AgGridReact
            rowData={employees || []}
            columnDefs={columns}
            domLayout='autoHeight'
          />
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='employee-form-dialog'
        aria-describedby='employee-form-dialog-desc'
      >
        <EmployeeForm
          employee={selectedEmployee}
          cafes={cafes}
          onEdit={handleEdit}
          onNew={handleNew}
          handleClose={() => setOpenDialog(false)}
        />
      </Dialog>
    </Box>
  );
}

export default EmployeesPage;

