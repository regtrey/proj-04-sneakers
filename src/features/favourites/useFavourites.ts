import { useQuery } from '@tanstack/react-query';
import { getFavourites } from '../../services/apiFavourites';

export function useFavourites(userId: string | undefined) {
  const { data: favouriteItems, isLoading: favouriteItemsLoading } = useQuery({
    queryKey: ['favourites', userId],
    queryFn: () => getFavourites(userId),
  });

  return { favouriteItems, favouriteItemsLoading };
}
