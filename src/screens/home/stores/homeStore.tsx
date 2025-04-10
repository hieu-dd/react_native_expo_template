import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

// Define the API call function
const fetchHomeData = async (filter: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return ['12', '23', '34', '45', '56', '67', '78', '89', '90'].filter(item =>
    item.includes(filter),
  );
};

export const useHomeStore = () => {
  const [filter, setFilter] = useState<string>('1');
  const [debouncedFilter, setDebouncedFilter] = useState<string>(filter);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedFilter(filter), 300); // Debounce filter
    return () => clearTimeout(handler);
  }, [filter]);

  // Use react-query to fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['homeData', debouncedFilter],
    queryFn: () => fetchHomeData(debouncedFilter),
  });

  // Function to update the filter
  const updateFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  return {
    data,
    isLoading,
    isError,
    filter,
    updateFilter,
  };
};
