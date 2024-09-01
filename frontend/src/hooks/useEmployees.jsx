import { useQuery } from '@tanstack/react-query';

// Function to fetch employees from the backend
const fetchEmployees = async () => {
  const response = await fetch('http://localhost:3000/employees');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.employees;
};

export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 15, // 15 minutes
    retry: 1, // Number of retry attempts
  });
}

