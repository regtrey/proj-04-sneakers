import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userSignout } from '../../services/apiAuth';

export function useSignout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signout, isLoading: signoutLoading } = useMutation({
    mutationFn: userSignout,
    onSuccess: () => {
      // Removing all cached queries after signing out
      queryClient.removeQueries();

      navigate('/', {
        replace: true,
      });
    },
  });

  return { signout, signoutLoading };
}
