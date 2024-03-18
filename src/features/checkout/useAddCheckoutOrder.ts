import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { addOrder } from '../../services/apiOrder';
import { IOrder } from '../../types/ProductType';

export function useAddCheckoutOrder() {
  const navigate = useNavigate();

  const { mutate: addOrderItem, isLoading: addOrderItemLoading } = useMutation({
    mutationFn: (orderItem: IOrder) => addOrder(orderItem),
    onSuccess: () => {
      navigate('/orders');
    },
  });

  return { addOrderItem, addOrderItemLoading };
}
