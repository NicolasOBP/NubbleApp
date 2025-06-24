import React from 'react';
import { Screen } from '../../../components/Screen/Screen';
import { Text } from '../../../components/Text/Text';
import { TextInput } from '../../../components/TextInput/TextInput';
import { Button } from '../../../components/Button/Button';
import { PasswordInput } from '../../../components/PasswordInput/PasswordInput';

export function SignUpScreen() {
  function submitForm() {
    // TODO implementar
  }

  return (
    <Screen canGoBack scrollable>
      <Text mb="s32" preset="headingLarge">
        Criar uma conta
      </Text>
      <TextInput
        boxProps={{ mb: 's20' }}
        label="Seu username"
        placeholder="@"
      />
      <TextInput
        boxProps={{ mb: 's20' }}
        label="Nome completo"
        placeholder="Digite seu nome completo"
      />
      <TextInput
        boxProps={{ mb: 's20' }}
        label="Email"
        placeholder="Digite seu email"
      />

      <PasswordInput
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{ mb: 's48' }}
      />

      <Button title="Criar uma conta" onPress={submitForm} />
    </Screen>
  );
}
