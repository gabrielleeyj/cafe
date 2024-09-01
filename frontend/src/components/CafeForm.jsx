import React, { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useNavigate, useParams } from '@tanstack/react-router';
import { TextField, Button, Box, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';

const CafeForm = ({ cafe, onSubmit, onDelete }) => {
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    Form,
    setValues,
    getField,
    meta: { isDirty, canSubmit }
  } = useForm({
    initialValues: {
      name: '',
      description: '',
      location: '',
      logo: null
    },
    onSubmit: async (values) => onSubmit(values, cafeId),
    validate: (values) => {
      const errors = {};
      if (values.name.length < 6 || values.name.length > 10) {
        errors.name = 'Name must be between 6 and 10 characters';
      }
      if (values.description.length > 256) {
        errors.description = 'Description must be no more than 256 characters';
      }
      return errors;
    }
  });

  useEffect(() => {
    if (cafe) {
      setValues(cafe);
    }
  }, [cafe, setValues]);

  const handleCancel = () => {
    if (!isDirty || window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      navigate('/cafes');
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(cafeId);
    setOpenDialog(false);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2097152) { // 2MB size limit
      getField('logo').setFieldValue(file);
    } else {
      alert('File size must be under 2MB.');
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
      <Form>
        <Typography variant="h6">{cafeId ? 'Edit Café' : 'Add New Café'}</Typography>
        <TextField
          label="Name"
          {...getField('name').inputProps}
          error={!!getField('name').error}
          helperText={getField('name').error}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          {...getField('description').inputProps}
          error={!!getField('description').error}
          helperText={getField('description').error}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          {...getField('location').inputProps}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={!canSubmit}>
            Submit
          </Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
          {cafeId && (
            <Button onClick={handleDelete} variant="outlined" color="error">
              Delete
            </Button>
          )}
        </Box>
      </Form>
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
      >
        Are you sure you want to delete this café? This action cannot be undone.
      </ConfirmationDialog>
    </Box>
  );
};

export default CafeForm;

