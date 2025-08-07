import { MutationOptions } from '@infra';
import { useMutation } from '@tanstack/react-query';

import { authService } from '../authService';
import { SignUpData } from '../authTypes';

export function useAuthSignUp(options?: MutationOptions<void>) {
  const { mutate, isPending } = useMutation<void, Error, SignUpData>({
    mutationFn: singUpData => authService.signUp(singUpData),
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    signUp: mutate,
    isLoading: isPending,
  };
}
