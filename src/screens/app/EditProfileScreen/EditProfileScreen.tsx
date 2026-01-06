import React from 'react';

import { useUserGetById } from '@domain';

import { Button, Screen } from '@components';
import { AppScreenProps } from '@routes';

import { EditProfileForm } from './components/EditProfileForm';
import { EditProfileHeader } from './components/EditProfileHeader';

export function EditProfileScreen({
  route,
}: AppScreenProps<'EditProfileScreen'>) {
  const { userId } = route.params;
  const { user } = useUserGetById(userId);

  function submitForm() {
    //TODO:
  }

  return (
    <Screen canGoBack scrollable title="Editar Perfil">
      <EditProfileHeader user={user} />
      {user && <EditProfileForm user={user} />}

      <Button mt="s40" title="Salvar alterações" onPress={submitForm} />
    </Screen>
  );
}
