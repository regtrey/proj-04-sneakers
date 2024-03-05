import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavourite } from '../../services/apiFavourites';

export function useDeleteFavourite(
  userId: string | undefined,
  shoeId: string | undefined
) {
  const queryClient = useQueryClient();

  const { mutate: deleteFavItem, isLoading: deleteFavItemLoading } =
    useMutation({
      mutationFn: () => deleteFavourite(userId, shoeId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['favProduct', userId, shoeId],
        });
      },
    });

  return { deleteFavItem, deleteFavItemLoading };
}
