import { useAuthCredentials, useSearchHistoryService } from '@service';
import { useMutation } from '@tanstack/react-query';

import { authService } from '../authService';

export function useAuthSignOut() {
  const { removeCredentials } = useAuthCredentials();
  const { clearUserList } = useSearchHistoryService();

  const { mutate, isPending } = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,

    onSettled: () => {
      removeCredentials();
      clearUserList();
    },
  });

  function signOut() {
    mutate();
  }

  return { signOut, isLoading: isPending };
}
