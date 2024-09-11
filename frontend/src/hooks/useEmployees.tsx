import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Employee = {
  id: string,
  name: string,
  email_address: string,
  gender: string,
  phone_number: string,
  cafe_id: string,
  start_date: Date,
};

const fetchEmployees = async () => {
  const response = await fetch('http://localhost:3000/employees');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.employees;
};

const fetchEmployeeList = async (cafe) => {
  const response = await fetch(`http://localhost:3000/employees?cafe=${cafe}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.employees;
};

const createEmployee = async (employee: Employee) => {
  const response = await fetch('http://localhost:3000/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const updateEmployee = async (employee: Employee) => {
  const response = await fetch(`http://localhost:3000/employees`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const deleteEmployee = async (id) => {
  const response = await fetch(`http://localhost:3000/employees`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useEmployees() {
  const queryClient = useQueryClient();

  // This query is for fetching all employees
  const employeesQuery = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    gcTime: 1000 * 60 * 15, // Data is cached for 15 minutes
    retry: 1,
  });

  // This query is for fetching employees filtered by café
  const filteredEmployeeList = (cafe) => useQuery({
    queryKey: ['employees', cafe],
    queryFn: () => fetchEmployeeList(cafe), // Pass a function that calls fetchEmployeeList
    enabled: !!cafe, // Only fetch when the café is not empty
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    gcTime: 1000 * 60 * 15, // Data is cached for 15 minutes
    retry: 1,
  });

  // Mutation for creating an employee
  const createEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => queryClient.invalidateQueries(['employees'])
  });

  // Mutation for updating an employee
  const updateEmployeeMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => queryClient.invalidateQueries(['employees'])
  });

  // Mutation for deleting an employee
  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries(['employees'])
  });

  return {
    employeesQuery,
    filteredEmployeeList, // Expose the filtered query function
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation
  };
}

