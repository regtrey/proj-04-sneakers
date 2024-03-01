import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getShoe } from '../services/apiShoes';

export function useShoe() {
  const { slugId } = useParams();

  const {
    isLoading,
    data: shoe,
    error,
  } = useQuery({
    queryKey: ['shoes', slugId],
    queryFn: () => getShoe(slugId),
  });

  return { isLoading, shoe, error };
}
