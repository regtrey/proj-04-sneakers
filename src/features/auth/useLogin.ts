import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { userLogin } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading: loginLoading,
    error: loginError,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      userLogin({ email, password }),
    onSuccess: () => {
      navigate('/', { replace: true });
    },
    onError: () => {
      console.error('The provided email or password are incorrect');
    },
  });

  return { login, loginLoading, loginError };
}
