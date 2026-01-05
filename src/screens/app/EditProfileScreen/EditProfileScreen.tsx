import React from 'react';

import { useUserGetById } from '@domain';

import { Screen } from '@components';
import { AppScreenProps } from '@routes';

import { EditProfileHeader } from './components/EditProfileHeader';

export function EditProfileScreen({
  route,
}: AppScreenProps<'EditProfileScreen'>) {
  const { userId } = route.params;
  const user = useUserGetById(userId);

  return (
    <Screen canGoBack scrollable title="Editar Perfil">
      <EditProfileHeader user={user.user} />
    </Screen>
  );
}
