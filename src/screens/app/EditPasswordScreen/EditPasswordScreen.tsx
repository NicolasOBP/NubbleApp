import React from 'react';

import { useAuthEditPassword } from '@domain';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastService } from '@service';
import { useForm } from 'react-hook-form';

import { Button, FormPasswordInput, Screen } from '@components';

import { editPasswordSchema, EditPasswordSchema } from './editPasswordSchema';

export function EditPasswordScreen() {
  const { showToast } = useToastService();
  const { editPassword, isLoading } = useAuthEditPassword({
    onError(message) {
      showToast({ message, type: 'error' });
    },
  });

  const { control, handleSubmit, formState } = useForm<EditPasswordSchema>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      confirmedPassword: '',
      currentPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
  });

  return (
    <Screen canGoBack scrollable title="Alterar Senha">
      <FormPasswordInput
        control={control}
        name="currentPassword"
        label="Senha atual"
        placeholder="Digite sua senha atual"
        boxProps={{ mb: 's20' }}
      />

      <FormPasswordInput
        control={control}
        name="newPassword"
        label="Nova Senha"
        placeholder="Digite sua nova Senha"
        boxProps={{ mb: 's20' }}
      />

      <FormPasswordInput
        control={control}
        name="confirmedPassword"
        label="Confirmar Senha"
        placeholder="Confirme sua nova Senha"
        boxProps={{ mb: 's20' }}
      />

      <Button
        disabled={!formState.isValid}
        title="Salvar alterações"
        onPress={handleSubmit(editPassword)}
        loading={isLoading}
        mt="s40"
      />
    </Screen>
  );
}
