import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../../services/apiOrder';

export function useOrder(userId: string | undefined) {
  const { data: orderItems, isLoading: orderItemsLoading } = useQuery({
    queryKey: ['order', userId],
    queryFn: () => getOrder(userId),
  });

  return { orderItems, orderItemsLoading };
}
