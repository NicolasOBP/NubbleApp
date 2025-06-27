import React from 'react';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text/Text';
import { Button } from '../../../components/Button/Button';
import { useResetNavigationSuccess } from '../../../hooks/useResetNavigationSuccess';
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from './forgotPasswordSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextInput } from '../../../components/Form/FormTextInput';

export function ForgotPasswordScreen() {
  const { reset } = useResetNavigationSuccess();
  const { control, formState, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  function submitForm(formValues: ForgotPasswordSchema) {
    // TODO: implementar

    console.log(formValues);

    reset({
      description:
        'Clique no link enviado no seu e-mail para recuperar sua senha',
      title: 'Enviamos as instruções para seu e-mail',
      icon: { name: 'messageRound', color: 'primary' },
    });
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
        disabled={!formState.isValid}
        title="Recuperar senha"
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
