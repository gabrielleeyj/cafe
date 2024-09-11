import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useCafes } from '../hooks/useCafes';
import { TextField, Button, Box, Typography } from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';

const CafeForm = ({ cafe, onEdit, onNew, handleClose }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { deleteCafeMutation } = useCafes();
  // Initialize form with useForm
  const form = useForm({
    defaultValues: {
      id: cafe?.id ?? '',
      name: cafe?.name ?? '',
      description: cafe?.description ?? '',
      location: cafe?.location ?? '',
      logo: cafe?.logo ?? null,
    },
    onSubmit: ({ value }) => {
      if (cafe) {
        onEdit(value);
      } else {
        onNew(value);
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

  const handleCancel = () => {
    if (!state.isDirty || window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      handleClose();
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (cafe) {
      deleteCafeMutation.mutate({ id: cafe.id });
    }
    setOpenDialog(false);
    handleClose();
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
        <Field name="name">
          {(field) => (
            <TextField
              label="Name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors}
              helperText={field.state.meta.errors}
              fullWidth
              margin="normal"
            />
          )}
        </Field>
        <Field name="description">
          {(field) => (
            <TextField
              label="Description"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors}
              helperText={field.state.meta.errors}
              fullWidth
              margin="normal"
            />
          )}
        </Field>
        <Field name="location">
          {(field) => (
            <TextField
              label="Location"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
        </Field>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary" 
            disabled={!form.state.canSubmit}
          >
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

