import { useMutation } from '@tanstack/react-query';

import { ICart } from '../../types/ProductType';
import { addFavourite } from '../../services/apiFavourites';

export function useAddFavourite() {
  const { mutate: addFavItem, isLoading: addFavItemLoading } = useMutation({
    mutationFn: (favItem: ICart) => addFavourite(favItem),
  });

  return { addFavItem, addFavItemLoading };
}
