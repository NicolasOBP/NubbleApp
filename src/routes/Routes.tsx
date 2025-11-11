import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
// import { useAuthCredentials } from '@service';

import { ActivityIndicator, Box } from '@components';

// import { AppStack } from './AppStack';
// import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { OnboardingStack } from './OnboardingStack';
import { Stacks, useRoute } from './useRoute';

function LoadingScreen() {
  return (
    <Box flex={1} bg="background" justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" />
    </Box>
  );
}

const stacks: Record<Stacks, React.ReactElement> = {
  Loading: <LoadingScreen />,
  App: <AppStack />,
  Auth: <AuthStack />,
  Onboarding: <OnboardingStack />,
};

export function Routes() {
  const stack = useRoute();
  const Stack = stacks[stack];

  return <NavigationContainer>{Stack}</NavigationContainer>;
}
