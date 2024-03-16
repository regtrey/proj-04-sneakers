import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '../../services/apiAuth';

interface IUpdatedUser {
  name: string;
  password: string;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation({
    mutationFn: ({ name, password }: IUpdatedUser) =>
      updateUserProfile(name, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { updateUser, updateUserLoading };
}
