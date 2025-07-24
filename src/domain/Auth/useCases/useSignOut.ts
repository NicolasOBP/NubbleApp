import { useMutation } from '@tanstack/react-query';

import { authService } from '../authService';

export function useAuthSignOut() {
  const { mutate, isPending } = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
  });
  return { signOut: () => mutate(), isLoading: isPending };
}
