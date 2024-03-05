import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/apiCart';

export function useCart(userId: string | undefined) {
  const { data: cartItems, isLoading: userCartLoading } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCart(userId),
  });

  return { cartItems, userCartLoading };
}
