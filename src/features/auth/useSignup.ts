import { useMutation } from '@tanstack/react-query';
import { userSignup } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading: signupLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      userSignup({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate('/');
    },
    onError: () => {
      console.error('The provided email or password are incorrect');
    },
  });

  return { signup, signupLoading };
}
