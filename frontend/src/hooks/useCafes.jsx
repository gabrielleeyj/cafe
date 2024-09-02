import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchCafes = async () => {
  const response = await fetch('http://localhost:3000/cafes');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.cafes;
};

const createCafe = async (cafe) => {
  const response = await fetch('http://localhost:3000/cafes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cafe)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const updateCafe = async ({ id, cafe }) => {
  const response = await fetch(`http://localhost:3000/cafes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cafe)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const deleteCafe = async (id) => {
  const response = await fetch(`http://localhost:3000/cafes`, {
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

export function useCafes() {
  const queryClient = useQueryClient();
  return {
    cafesQuery: useQuery({
      queryKey: ['cafes'],
      queryFn: fetchCafes,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 15,
      retry: 1,
    }),
    createCafeMutation: useMutation({
      mutationFn: createCafe,
      onSuccess: () => queryClient.invalidateQueries(['cafes'])
    }),
    updateCafeMutation: useMutation({
      mutationFn: updateCafe,
      onSuccess: () => queryClient.invalidateQueries(['cafes'])
    }),
    deleteCafeMutation: useMutation({
      mutationFn: deleteCafe,
      onSuccess: () => queryClient.invalidateQueries(['cafes'])
    })
  };
}

