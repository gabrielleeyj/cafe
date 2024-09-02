import React, { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees'; // Fetch employees
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function EmployeeAdd({ cafeId, employees, onClose }) {
  const { updateEmployeeMutation } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const handleAddEmployee = () => {
    selectedEmployee.cafe = cafeId;
    selectedEmployee.start_date = new Date().toISOString().split('T')[0];
    console.log('selected', selectedEmployee);
    updateEmployeeMutation.mutate({ employee: selectedEmployee });
    onClose();
  };

  return (
      <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel id="select-employee-label">Select Employee</InputLabel>
          <Select
            labelId="select-employee-label"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            label="Select Employee"
          >
            {employees?.map((employee) => (
              <MenuItem key={employee.id} value={employee}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleAddEmployee} variant="contained" sx={{ m: 2 }}>
          Add Employee
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ m: 2 }}>
          Cancel
        </Button>
    </Box>
  );
}

export default EmployeeAdd;

