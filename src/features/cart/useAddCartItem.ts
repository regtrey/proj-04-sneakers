import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ICartItems } from './cartSlice';
import { addCart } from '../../services/apiCart';

export function useAddCartItem() {
  const navigate = useNavigate();

  const { mutate: addItem, isLoading: addItemLoading } = useMutation({
    mutationFn: (cartItems: ICartItems) => addCart(cartItems),
    onSuccess: () => {
      navigate('/cart');
    },
  });

  return { addItem, addItemLoading };
}
