import React from 'react';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text/Text';
import { TextInput } from '../../../components/TextInput/TextInput';
import { Button } from '../../../components/Button/Button';
import { useResetNavigationSuccess } from '../../../hooks/useResetNavigationSuccess';

export function ForgotPasswordScreen() {
  const { reset } = useResetNavigationSuccess();

  function submitForm() {
    // TODO: implementar

    reset({
      description:
        'Clique no link enviado no seu e-mail para recuperar sua senha',
      title: 'Enviamos as instruções para seu e-mail',
      icon: { name: 'messageRound', color: 'primary' },
    });

    // navigation.navigate('SuccessScreen', {
    //   description:
    //     'Clique no link enviado no seu e-mail para recuperar sua senha',
    //   title: 'Enviamos as instruções para seu e-mail',
    //   icon: { name: 'messageRound', color: 'primary' },
    // });
  }

  return (
    <Screen canGoBack>
      <Text mb="s16" preset="headingLarge">
        Esqueci minha senha
      </Text>
      <Text mb="s32" preset="paragraphLarge">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{ mb: 's24' }}
      />

      <Button title="Recuperar senha" onPress={submitForm} />
    </Screen>
  );
}
