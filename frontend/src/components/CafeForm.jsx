import React, { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';

const CafeForm = ({ cafe, onEdit, onSubmit, onDelete, handleClose } = {}) => {
  const [openDialog, setOpenDialog] = useState(false);

  // Initialize form with useForm
  const form = useForm({
    initialValues: {
      name: cafe?.name || '',
      description: cafe?.description || '',
      location: cafe?.location || '',
      logo: cafe?.logo || null,
    },
    onSubmit: async (values) => {
      if (cafe) {
        await onEdit(cafe.id, values);
      } else {
        await onSubmit(values);
      }
    },
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

  const { Field, state, handleSubmit } = form;
  console.log("form", form);

  const handleCancel = () => {
    if (!state.isDirty || window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      handleClose();
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (cafe) {
      await onDelete(cafe.id);
    }
    setOpenDialog(false);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2097152) { // 2MB size limit
      Field.logo.set(file);
    } else {
      alert('File size must be under 2MB.');
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
      <form>
        <Typography variant="h6">{cafe ? 'Edit Café' : 'Add New Café'}</Typography>
    <Field name="name"
    children={(field) => 
      (
        <TextField
          label="Name"
          value={field.state.value}
          fullWidth
          margin="normal"
        />)}
    />
        <TextField
          label="Description"
          value={Field.description}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={Field.location}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button type="button" onClick={handleSubmit} variant="contained" color="primary" disabled={!state.canSubmit}>
            Submit
          </Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
          {cafe && (
            <Button onClick={handleDelete} variant="outlined" color="error">
              Delete
            </Button>
          )}
        </Box>
      </form>
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

