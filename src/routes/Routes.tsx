import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useAuthCredentials } from '@service';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Routes() {
  // const authenticated = false;
  const { authCredentials } = useAuthCredentials();

  return (
    <NavigationContainer>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
