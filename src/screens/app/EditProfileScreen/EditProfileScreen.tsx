import React from 'react';

import { Screen, Text } from '@components';

export function EditProfileScreen() {
  return (
    <Screen canGoBack scrollable title="Editar Perfil">
      <Text preset="headingSmall">Editar Perfil</Text>
    </Screen>
  );
}
