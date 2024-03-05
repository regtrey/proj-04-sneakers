import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/apiCart';

export function useCart(userId: string | undefined) {
  const { data, isLoading: userCartLoading } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCart(userId),
  });

  return { data, userCartLoading };
}
