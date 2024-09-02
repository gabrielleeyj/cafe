import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { AgGridReact } from 'ag-grid-react';
import { Button, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useEmployees } from '../hooks/useEmployees';
import { useCafes } from '../hooks/useCafes';
import EmployeeForm from '../components/EmployeeForm';
import { Route } from '../routes/employees.lazy';

function EmployeesPage() {
  const { cafesQuery } = useCafes();
  const { data: cafes } = cafesQuery;
  const { employeesQuery, filteredEmployeeList, deleteEmployeeMutation, createEmployeeMutation, updateEmployeeMutation } = useEmployees();
  const { data: employees, isLoading, error, refetch } = employeesQuery;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleEmployee = (employees) => {
    console.log(employees);
  };

  const { cafe } = Route.useSearch();
  const { data } = filteredEmployeeList(cafe);

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
          <Button variant="contained" onClick={() => handleOpen()}>New Employee</Button>
          &nbsp;
          <Button variant="contained" onClick={() => handleEmployee(employees)}>Add Employee</Button>
          &nbsp;
          <Link to='/cafes'>
            <Button variant="contained">Back</Button>
          </Link>
        </Grid>

        <Grid size={12}>
          <AgGridReact
            rowData={cafe ? data : employees || []}
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

