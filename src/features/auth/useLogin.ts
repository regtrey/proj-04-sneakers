import { useMutation } from '@tanstack/react-query';
import { userLogin } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading: loginLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      userLogin({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate('/');
    },
    onError: () => {
      console.error('The provided email or password are incorrect');
    },
  });

  return { login, loginLoading };
}
