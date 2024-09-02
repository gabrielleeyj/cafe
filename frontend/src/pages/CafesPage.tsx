import React, { useState } from 'react';
import { useCafes } from '../hooks/useCafes';
import { AgGridReact } from 'ag-grid-react';
import { Button, TextField, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CafeForm from '../components/CafeForm';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function CafesPage() {
  const { cafesQuery, deleteCafeMutation, updateCafeMutation, createCafeMutation } = useCafes();
  const { data: cafes, isLoading, error, refetch } = cafesQuery;
  const [filterText, setFilterText] = useState('');
  const [selectedCafe, setSelectedCafe] = useState(null); // Store the selected cafe object
  const [openDialog, setOpenDialog] = useState(false);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredCafes = cafes?.filter(cafe => cafe.location.toLowerCase().includes(filterText.toLowerCase()));

  const handleOpen = (cafe) => {
    setSelectedCafe(cafe);
    setOpenDialog(true);
  };

  const columns = [
    { field: 'logo', headerName: 'Logo', cellRenderer: (params) => params ? <img src={params.value} alt="logo" style={{ width: 50, height: 50 }} /> : null },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'employees', headerName: 'Employees' },
    { field: 'location', headerName: 'Location' },
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
    }
  ];

  const handleEdit = (data: object) => {
    console.log('handleEdit', data);
    updateCafeMutation.mutate({cafe: data});
    refetch();
    setOpenDialog(false); // Close the dialog after submission
  };

  const handleNew = (values: object) => {
    createCafeMutation.mutate({cafe: values});
    refetch();
    setOpenDialog(false); // Close after submission
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this cafe?');
    if (confirm) {
      deleteCafeMutation.mutate({id: id });
      refetch(); // Re-fetch the data after deleting
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Box sx={{ width: '100%', my: 4 }}>
      <Grid container spacing={2} className="ag-theme-quartz">
        <Grid size={12}>
          <Button size="medium" variant="contained" onClick={handleOpen}>Add New Café</Button>
        </Grid>
        <Grid size={12}>
          <TextField
            size="small"
            label="Filter by Location"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid size={12}>
          <AgGridReact
            rowData={filteredCafes}
            columnDefs={columns}
            domLayout='autoHeight'
          />
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CafeForm 
          cafe={selectedCafe} 
          onEdit={handleEdit}
          onNew={handleNew}
          handleClose={() => setOpenDialog(false)}
          />
      </Dialog>
    </Box >
  );
}

export default CafesPage;

