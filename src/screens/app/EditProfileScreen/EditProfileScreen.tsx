import React, { useRef, useState } from 'react';

import { useUserGetById } from '@domain';

import { Button, InputButton, Screen } from '@components';
import { AppScreenProps } from '@routes';

import {
  EditProfileForm,
  EditProfileFormRef,
} from './components/EditProfileForm';
import { EditProfileHeader } from './components/EditProfileHeader';

export function EditProfileScreen({
  route,
  navigation,
}: AppScreenProps<'EditProfileScreen'>) {
  const { userId } = route.params;
  const { user } = useUserGetById(userId);
  const [formIsValid, setFormIsValid] = useState(false);

  const formRef = useRef<EditProfileFormRef>(null);

  function submitForm() {
    formRef.current?.onSubmit();
  }

  return (
    <Screen canGoBack scrollable title="Editar Perfil">
      <EditProfileHeader user={user} mb="s24" />
      {user && (
        <>
          <EditProfileForm
            ref={formRef}
            user={user}
            onChangeIsvalid={setFormIsValid}
          />

          <InputButton
            label="Trocar Email"
            value={user.email}
            onPress={() => navigation.navigate('EditEmailScreen', { userId })}
            mb="s16"
          />

          <InputButton
            label="Trocar Senha"
            value="••••••"
            onPress={() =>
              navigation.navigate('EditPasswordScreen', { userId })
            }
          />
        </>
      )}

      <Button
        disabled={!formIsValid}
        mt="s40"
        title="Salvar alterações"
        onPress={submitForm}
      />
    </Screen>
  );
}
