import { useQuery } from '@tanstack/react-query';
import { getShoes } from '../services/apiShoes';

export function useShoes(currentPath: string, searchQuery?: string) {
  const {
    isLoading,
    data: shoes,
    error,
  } = useQuery({
    queryKey: ['shoes', currentPath, searchQuery],
    queryFn: () => getShoes(currentPath, searchQuery),
  });

  return { isLoading, shoes, error };
}
