import { useQuery } from '@tanstack/react-query';
import { getShoes } from '../services/apiShoes';

export function useShoes(currentPath: string) {
  const {
    isLoading,
    data: shoes,
    error,
  } = useQuery({
    queryKey: ['shoes', currentPath],
    queryFn: () => getShoes(currentPath),
  });

  return { isLoading, shoes, error };
}
