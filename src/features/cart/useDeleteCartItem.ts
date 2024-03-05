import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCart } from '../../services/apiCart';

export function useDeleteCartItem(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, isLoading: deleteItemLoading } = useMutation({
    mutationFn: (cartId: string | undefined) => deleteCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  return { deleteItem, deleteItemLoading };
}
