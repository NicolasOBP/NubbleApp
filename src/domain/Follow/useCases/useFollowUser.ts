import { MutationOptions, QueryKeys } from '@infra';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from 'src/domain/User';

import { followService } from '../followService';

export function useFollowUser(options?: MutationOptions<void>) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<User, unknown, number>({
    mutationFn: userId => followService.followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MyFollowingList],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.UserGetById],
      });
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'erro ao seguir usuário');
      }
    },
  });

  function followUser(userId: number) {
    mutate(userId);
  }

  return {
    followUser,
    isLoading: isPending,
  };
}
