import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCafes } from '../hooks/useCafes';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, only needs to be imported once
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Button, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CafesPage() {
  const { data: cafes, isLoading, error, refetch } = useCafes();
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
      cellRendererFramework: (params) => (
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
      <Button variant="contained" onClick={() => navigate('/cafes/new')}>Add New Café</Button>
      <TextField
        label="Filter by Location"
        variant="outlined"
        value={filterText}
        onChange={handleFilterChange}
      />
      <div className="ag-theme-alpine" style={{ width: '100%' }}>
        <AgGridReact
          rowData={filteredCafes}
          columnDefs={columns}
          domLayout='autoHeight'
        />
      </div>
    </Box>
  );
}

export default CafesPage;

