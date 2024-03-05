import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCart } from '../../services/apiCart';

type UpdateCart = {
  selectedSize?: number;
  quantity?: number;
  total?: number;
  isFavourite?: boolean;
};

export function useUpdateCartItem(
  userId: string | undefined,
  cartId: string | undefined,
  eqField?: string | undefined
) {
  const queryClient = useQueryClient();

  const { mutate: updateItem, isLoading: updateItemLoading } = useMutation({
    mutationFn: (updatedItem: UpdateCart) =>
      updateCart(updatedItem, cartId, eqField),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  return { updateItem, updateItemLoading };
}
