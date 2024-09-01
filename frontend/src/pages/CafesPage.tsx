import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCafes } from '../hooks/useCafes';
import { AgGridReact } from 'ag-grid-react';
import { Button, TextField, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function CafesPage() {
  const { cafesQuery } = useCafes();
  const { data: cafes, isLoading, error, refetch } = cafesQuery;
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredCafes = cafes?.filter(cafe => cafe.location.toLowerCase().includes(filterText.toLowerCase()));

  const columns = [
    { field: 'logo', headerName: 'Logo', cellRenderer: (params) => <img src={params.value} alt="logo" style={{ width: 50, height: 50 }} /> },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'employees', headerName: 'Employees' },
    { field: 'location', headerName: 'Location' },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params) => (
        <React.Fragment>
          <Button startIcon={<EditIcon />} onClick={() => navigate(`/cafes/edit/${params.data.id}`)} color="primary">
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
    const confirm = window.confirm('Are you sure you want to delete this cafe?');
    if (confirm) {
      await fetch(`http://localhost:3000/cafes/${id}`, { method: 'DELETE' });
      refetch(); // Re-fetch the data after deleting
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Box sx={{ width: '100%', my: 4 }}>
      <Grid container spacing={2} className="ag-theme-quartz">
        <Grid size={12}>
          <Button size="medium" variant="contained" onClick={() => navigate('/cafes/new')}>Add New Café</Button>
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
    </Box >
  );
}

export default CafesPage;

