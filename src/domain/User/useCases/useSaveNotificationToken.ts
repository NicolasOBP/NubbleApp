import { useEffect } from 'react';

import messaging from '@react-native-firebase/messaging';
import { useMutation } from '@tanstack/react-query';

import { userService } from '../userService';

export function useSaveNotificationToken() {
  const mutation = useMutation<string, unknown, string>({
    mutationFn: userService.addNotificationToken,
    retry: false,
  });

  async function saveNotificationToken() {
    try {
      const token = await messaging().getToken();
      mutation.mutate(token);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    saveNotificationToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: mutation.isPending,
    saveNotificationToken,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}
