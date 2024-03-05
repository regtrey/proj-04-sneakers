import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { addCart } from '../../services/apiCart';
import { ICart } from '../../types/ProductType';

export function useAddCartItem() {
  const navigate = useNavigate();

  const { mutate: addItem, isLoading: addItemLoading } = useMutation({
    mutationFn: (cartItems: ICart) => addCart(cartItems),
    onSuccess: () => {
      navigate('/cart');
    },
  });

  return { addItem, addItemLoading };
}
