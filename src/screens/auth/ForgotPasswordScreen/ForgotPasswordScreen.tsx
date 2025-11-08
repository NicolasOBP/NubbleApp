import React from 'react';

import { useAuthRequestNewPassword } from '@domain';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastService } from '@service';
import { useForm } from 'react-hook-form';

import { Button, FormTextInput, Screen, Text } from '@components';
import { useResetNavigationSuccess } from '@hooks';
import { AuthScreenProps, AuthStackParamList } from '@routes';

import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from './forgotPasswordSchema';

const resetParam: AuthStackParamList['SuccessScreen'] = {
  description: 'Clique no link enviado no seu e-mail para recuperar sua senha',
  title: 'Enviamos as instruções para seu e-mail',
  icon: {
    name: 'messageRound',
    color: 'iconColor',
    fillColor: 'iconFillColor',
  },
};

export function ForgotPasswordScreen({}: AuthScreenProps<'ForgotPasswordScreen'>) {
  const { reset } = useResetNavigationSuccess();
  const { showToast } = useToastService();
  const { isLoading, requestNewPassword } = useAuthRequestNewPassword({
    onSuccess: () => reset(resetParam),
    onError: message => showToast({ message, type: 'error' }),
  });
  const { control, formState, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  function submitForm(formValues: ForgotPasswordSchema) {
    requestNewPassword(formValues.email);
  }

  return (
    <Screen canGoBack>
      <Text mb="s16" preset="headingLarge">
        Esqueci minha senha
      </Text>
      <Text mb="s32" preset="paragraphLarge">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 's24' }}
      />

      <Button
        loading={isLoading}
        disabled={!formState.isValid}
        title="Recuperar senha"
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
