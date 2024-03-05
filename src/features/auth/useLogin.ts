import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { userLogin } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading: loginLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      userLogin({ email, password }),
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      console.error('The provided email or password are incorrect');
    },
  });

  return { login, loginLoading };
}
