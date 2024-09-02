import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useEmployees } from '../hooks/useEmployees';

const EmployeeForm = ({ employee, cafes, onEdit, onNew, handleClose }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { deleteEmployeeMutation } = useEmployees();

  const form = useForm({
    defaultValues: {
      id: employee?.id ?? '',
      name: employee?.name ?? '',
      email_address: employee?.email_address ?? '',
      phone_number: employee?.phone_number ?? '',
      gender: employee?.gender ?? '',
      cafe: employee?.cafe ?? '',
      start_date: employee?.start_date ?? new Date().toISOString().split('T')[0]
    },
    onSubmit: ({ value }) => {
      if (employee) {
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
      if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Email must be a valid email address';
      }
      if (values.phoneNumber.lenght <= 8 || values.phoneNumber.length < 9) {
        errors.phoneNumber = 'Phone number must be 8 digits long';
      }
      return errors;
    }
  });

  const { Field, state, handleSubmit } = form;
  console.log(form.state.meta);

  const handleCancel = () => {
    if (!state.isDirty || window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      handleClose();
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (employee) {
      deleteEmployeeMutation.mutate({ id: employee.id });
    }
    setOpenDialog(false);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
        <form>
          <Typography variant="h6">{employee ? 'Edit Employee' : 'Add New Employee'}</Typography>
          <Field name="name"
            children={(field) => (
              <TextField
                label="Name"
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                fullWidth
                margin="normal"
              />
            )}
          />
          <Field name="email_address"
            children={(field) => (
              <TextField
                label="Email Address"
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                fullWidth
                margin="normal"
              />
            )}
          />
          <Field name="phone_number"
            children={(field) => (
              <TextField
                label="Phone Number"
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                fullWidth
                margin="normal"
              />
            )}
          />
          <Field name="gender"
            children={(field) => (
              <RadioGroup row
                defaultValue={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            )}
          />
          <Field name="cafe"
            children={(field) => (
              <FormControl fullWidth>
                <InputLabel id="cafe-select-label">Assigned Café</InputLabel>
                <Select
                  label="Assigned Café"
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  fullWidth
                >
                  {cafes.map(cafe => (
                    <MenuItem key={cafe.id} value={cafe.id}>{cafe.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Field name="start_date"
            children={(field) => (
              <DatePicker
                label="Start Date"
                value={field.state.value ? dayjs(field.state.value) : null}
                onChange={(date) => field.handleChange(date ? date.format('YYYY-MM-DD') : '')}
                slotProps={{ textField: { variant: 'outlined', margin: 'normal', fullWidth: true } }}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button type="button" variant="contained" color="primary" onClick={handleSubmit} disabled={!state.canSubmit}>
              Submit
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
            {employee && (
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
          Are you sure you want to delete this employee? This action cannot be undone.
        </ConfirmationDialog>
      </Box>
    </LocalizationProvider>
  );
};

export default EmployeeForm;

