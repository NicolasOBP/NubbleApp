import { MutationOptions, QueryKeys } from '@infra';
import { useAuthCredentials } from '@service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '../userService';
import { UpdateUserParams, User } from '../userTypes';

export function useUserUpdate(options?: MutationOptions<User>) {
  const queryClient = useQueryClient();
  const { authCredentials } = useAuthCredentials();

  const { mutate, isPending } = useMutation<User, unknown, UpdateUserParams>({
    mutationFn: params => updateUser(params),
    retry: false,
    onError: error => {
      if (options?.onError) {
        //TODO: options.onError(error);
      }
      console.log(error);
    },
    onSuccess: user => {
      if (options?.onSuccess) {
        options.onSuccess(user);
      }
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.UserGetById, user.id],
      });
      //TODO: invalidate authCredentials?.user
    },
  });

  async function updateUser(params: UpdateUserParams): Promise<User> {
    if (!authCredentials) {
      throw new Error('user not found');
    }
    const user = userService.updateUser(authCredentials.user, params);

    return user;
  }

  return {
    isLoading: isPending,
    updateUser: (params: UpdateUserParams) => mutate(params),
  };
}
