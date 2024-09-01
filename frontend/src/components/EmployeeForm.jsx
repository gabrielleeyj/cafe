import React, { useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useNavigate, useParams } from '@tanstack/react-router';
import { TextField, Button, Box, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';

const EmployeeForm = ({ employee, cafes, onSubmit, onDelete }) => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    Form,
    setValues,
    getField,
    meta: { isDirty, canSubmit }
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      gender: '',
      cafeId: ''
    },
    onSubmit: async (values) => onSubmit(values, employeeId),
    validate: (values) => {
      const errors = {};
      if (values.name.length < 6 || values.name.length > 10) {
        errors.name = 'Name must be between 6 and 10 characters';
      }
      if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Email must be a valid email address';
      }
      if (!/^[89]\d{7}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone number must start with 8 or 9 and be 8 digits long';
      }
      return errors;
    }
  });

  useEffect(() => {
    if (employee) {
      setValues({
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
        cafeId: employee.cafeId || ''
      });
    }
  }, [employee, setValues]);

  const handleCancel = () => {
    if (!isDirty || window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      navigate('/employees');
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(employeeId);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
      <Form>
        <Typography variant="h6">{employeeId ? 'Edit Employee' : 'Add New Employee'}</Typography>
        <TextField
          label="Name"
          {...getField('name').inputProps}
          error={!!getField('name').error}
          helperText={getField('name').error}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email Address"
          {...getField('email').inputProps}
          error={!!getField('email').error}
          helperText={getField('email').error}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          {...getField('phoneNumber').inputProps}
          error={!!getField('phoneNumber').error}
          helperText={getField('phoneNumber').error}
          fullWidth
          margin="normal"
        />
        <RadioGroup row {...getField('gender').inputProps}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <TextField
          select
          label="Assigned Café"
          {...getField('cafeId').inputProps}
          SelectProps={{ native: true }}
          fullWidth
          margin="normal"
        >
          <option value="">None</option>
          {cafes.map(cafe => (
            <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={!canSubmit}>
            Submit
          </Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
          {employeeId && (
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
        Are you sure you want to delete this employee? This action cannot be undone.
      </ConfirmationDialog>
    </Box>
  );
};

export default EmployeeForm;

