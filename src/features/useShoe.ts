import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getShoe } from '../services/apiShoes';

export function useShoe() {
  const { id } = useParams();

  const {
    isLoading,
    data: shoe,
    error,
  } = useQuery({
    queryKey: ['shoes', id],
    queryFn: () => getShoe(id),
  });

  return { isLoading, shoe, error };
}
