import { useQuery } from '@tanstack/react-query';

// Function to fetch cafes from the backend
const fetchCafes = async () => {
  const response = await fetch('http://localhost:3000/cafes');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.cafes;
};

export function useCafes() {
  return useQuery({
    queryKey: ['cafes'],
    queryFn: fetchCafes,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 15, // 15 minutes
    retry: 1, // Number of retry attempts
  });
}

