import { useAuthCredentials, useShowOnboarding } from '@service';

export type Stacks = 'Loading' | 'App' | 'Auth' | 'Onboarding';

export function useRoute(): Stacks {
  const showOnboarding = useShowOnboarding();
  const { authCredentials, isLoading } = useAuthCredentials();

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
