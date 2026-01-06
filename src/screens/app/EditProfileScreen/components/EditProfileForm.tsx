import React, { forwardRef, useEffect, useImperativeHandle } from 'react';

import { authService, User } from '@domain';
import { useAsyncValidation } from '@form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ActivityIndicator, Box, FormTextInput } from '@components';

import { editProfileSchema, EditProfileSchema } from '../editProfileSchema';

type Props = {
  user: User;
  onChangeIsvalid: (isValid: boolean) => void;
};

export type EditProfileFormRef = {
  onSubmit: () => void;
};

export function EditProfileFormComponent(
  { user, onChangeIsvalid }: Props,
  ref: React.Ref<EditProfileFormRef>,
) {
  const { control, watch, getFieldState, formState, handleSubmit } =
    useForm<EditProfileSchema>({
      resolver: zodResolver(editProfileSchema),
      defaultValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
      mode: 'onChange',
    });

  const usernameValidation = useAsyncValidation({
    watch,
    getFieldState,
    fieldName: 'username',
    isAvailableFunc: authService.isUserNameAvailable,
    errorMessage: 'username indisponível',
  });

  useEffect(() => {
    onChangeIsvalid(formState.isValid && !usernameValidation.notReady);
  }, [formState.isValid, onChangeIsvalid, usernameValidation.notReady]);

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      handleSubmit(formValues => console.log(formValues))();
    },
  }));

  return (
    <Box>
      <FormTextInput
        control={control}
        name="username"
        boxProps={{ mb: 's20' }}
        label="Seu username"
        placeholder="@"
        errorMessage={usernameValidation.errorMessage}
        RighComponent={
          usernameValidation.isFetching ? (
            <ActivityIndicator size="small" />
          ) : undefined
        }
      />

      <FormTextInput
        control={control}
        name="firstName"
        boxProps={{ mb: 's20' }}
        autoCapitalize="words"
        label="Nome"
        placeholder="Digite seu nome"
      />

      <FormTextInput
        control={control}
        name="lastName"
        boxProps={{ mb: 's20' }}
        autoCapitalize="words"
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
      />
    </Box>
  );
}

export const EditProfileForm = forwardRef(EditProfileFormComponent);
