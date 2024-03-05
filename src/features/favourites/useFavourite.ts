import { useQuery } from '@tanstack/react-query';
import { getFavourite } from '../../services/apiFavourites';

export function useFavourite(
  userId: string | undefined,
  shoeId: string | undefined
) {
  const { data: favItem, isLoading: favItemLoading } = useQuery({
    queryKey: ['favProduct', userId, shoeId],
    queryFn: () => getFavourite(userId, shoeId),
  });

  return { favItem, favItemLoading };
}
