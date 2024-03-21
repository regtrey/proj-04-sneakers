import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { userSignup } from '../../services/apiAuth';

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading: signupLoading } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => userSignup({ name, email, password }),
    onSuccess: () => {
      navigate('/', { replace: true });
    },
    onError: () => {
      console.error('The provided email or password are incorrect');
    },
  });

  return { signup, signupLoading };
}
