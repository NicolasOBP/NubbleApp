import { useAuthCredentials } from '@service';
import { useMutation } from '@tanstack/react-query';

import { authService } from '../authService';

export function useAuthSignOut() {
  const { removeCredentials } = useAuthCredentials();

  const { mutate, isPending } = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,

    onSuccess: removeCredentials,
  });

  return { signOut: () => mutate(), isLoading: isPending };
}
