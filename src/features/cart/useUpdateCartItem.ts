import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCart } from '../../services/apiCart';

type UpdateCart = {
  selectedSize?: number;
  quantity?: number;
  total?: number;
};

export function useUpdateCartItem(
  userId: string | undefined,
  cartId: string | undefined
) {
  const queryClient = useQueryClient();

  const { mutate: updateItem, isLoading: updateItemLoading } = useMutation({
    mutationFn: (updatedItem: UpdateCart) => updateCart(updatedItem, cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  return { updateItem, updateItemLoading };
}
