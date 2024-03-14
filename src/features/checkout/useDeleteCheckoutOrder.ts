import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCartOrder } from '../../services/apiOrder';

export function useDeleteCheckoutOrder(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { mutate: deleteOrderItem, isLoading: deleteOrderItemLoading } =
    useMutation({
      mutationFn: (userId: string | undefined) => deleteCartOrder(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cart', userId] });
      },
    });

  return { deleteOrderItem, deleteOrderItemLoading };
}
