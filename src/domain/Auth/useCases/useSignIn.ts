import { MutationOptions } from '@infra';
import { useAuthCredentials } from '@service';
import { useMutation } from '@tanstack/react-query';

import { authService } from '../authService';
import { AuthCredentials } from '../authTypes';

interface Variables {
  email: string;
  password: string;
}

export function useAuthSignIn(options?: MutationOptions<AuthCredentials>) {
  const { saveCredentials } = useAuthCredentials();

  const { mutate, isPending } = useMutation<AuthCredentials, Error, Variables>({
    mutationFn: ({ email, password }) => authService.signIn(email, password),
    retry: false,

    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },

    onSuccess: authCredentials => {
      saveCredentials(authCredentials);
      authService.updateToken(authCredentials.token);
    },
  });

  return {
    signIn: (variables: Variables) => mutate(variables),
    isLoading: isPending,
  };
}
