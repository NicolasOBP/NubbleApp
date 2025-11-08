import React from 'react';

import { Screen, Text } from '@components';
import { AppScreenProps } from '@routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DarkModeScreen(params: AppScreenProps<'DarkModeScreen'>) {
  return (
    <Screen canGoBack title="Modo Escuro">
      <Text>Dark Mode Screen</Text>
    </Screen>
  );
}
