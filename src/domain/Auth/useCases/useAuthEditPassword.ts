import { MutationOptions } from '@infra';
import { useMutation } from '@tanstack/react-query';
import { errorUtils } from '@utils';

import { authService } from '../authService';
import { EditPasswordParams } from '../authTypes';

export function useAuthEditPassword(options?: MutationOptions<string>) {
  const { mutate, isPending } = useMutation<
    string,
    unknown,
    EditPasswordParams
  >({
    mutationFn: params => authService.editPassword(params),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(errorUtils.getErrorMessage(error));
      }
    },
    onSuccess: message => {
      if (options?.onSuccess) {
        options.onSuccess(message);
      }
    },
  });

  return {
    editPassword: (params: EditPasswordParams) => mutate(params),
    isLoading: isPending,
  };
}
