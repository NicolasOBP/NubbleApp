import { useEffect } from 'react';

import {
  settingsService,
  useAuthCredentials,
  useShowOnboarding,
} from '@service';

export type Stacks = 'Loading' | 'App' | 'Auth' | 'Onboarding';

export function useRoute(): Stacks {
  const showOnboarding = useShowOnboarding();
  const { authCredentials, isLoading } = useAuthCredentials();

  useEffect(() => {
    if (!isLoading) {
      settingsService.hideSplashScreen();
    }
  }, [isLoading]);

  if (isLoading) {
    return 'Loading';
  }

  if (showOnboarding) {
    return 'Onboarding';
  }

  if (authCredentials) {
    return 'App';
  }

  return 'Auth';
}
