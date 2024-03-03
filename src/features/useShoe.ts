import { useQuery } from '@tanstack/react-query';
import { getShoe } from '../services/apiShoes';

export function useShoe(currentPath: string[]) {
  const [curCategory, curSlugId] = currentPath;

  const {
    isLoading,
    data: shoe,
    error,
  } = useQuery({
    queryKey: ['shoes', curSlugId],
    queryFn: () => getShoe(curCategory, curSlugId),
  });

  return { isLoading, shoe, error };
}
