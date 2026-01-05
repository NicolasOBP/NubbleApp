import React from 'react';

import { Screen, Text } from '@components';

export function EditPasswordScreen() {
  return (
    <Screen canGoBack scrollable title="Editar Senha">
      <Text preset="headingSmall">Editar Senha</Text>
    </Screen>
  );
}
