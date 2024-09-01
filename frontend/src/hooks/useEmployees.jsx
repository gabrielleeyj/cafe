import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchEmployees = async () => {
  const response = await fetch('http://localhost:3000/employees');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.employees;
};

const createEmployee = async (employee) => {
  const response = await fetch('http://localhost:3000/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const updateEmployee = async ({ id, employee }) => {
  const response = await fetch(`http://localhost:3000/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const deleteEmployee = async (id) => {
  const response = await fetch(`http://localhost:3000/employees/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Assuming it sends back some json
};

export function useEmployees() {
  const queryClient = useQueryClient();
  return {
    employeesQuery: useQuery({
      queryKey: ['employees'],
      queryFn: fetchEmployees,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 15,
      retry: 1,
    }),
    createEmployeeMutation: useMutation({
      mutationFn: createEmployee,
      onSuccess: () => queryClient.invalidateQueries(['employees'])
    }),
    updateEmployeeMutation: useMutation({
      mutationFn: updateEmployee,
      onSuccess: () => queryClient.invalidateQueries(['employees'])
    }),
    deleteEmployeeMutation: useMutation({
      mutationFn: deleteEmployee,
      onSuccess: () => queryClient.invalidateQueries(['employees'])
    })
  };
}

