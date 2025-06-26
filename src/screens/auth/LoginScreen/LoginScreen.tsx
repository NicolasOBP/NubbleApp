import React, { useEffect, useState } from 'react';
import { Text } from '../../../components/Text/Text';
import { TextInput } from '../../../components/TextInput/TextInput';
import { Button } from '../../../components/Button/Button';
import { Screen } from '../../../components/Screen/Screen';
import { PasswordInput } from '../../../components/PasswordInput/PasswordInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/Routes';
import { Alert } from 'react-native';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export function LoginScreen({ navigation }: ScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  useEffect(() => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    setEmailErrorMessage(isValidEmail ? '' : 'E-mail inválido');
  }, [email]);

  function submitForm() {
    Alert.alert(`Email: ${email} ${'\n'} Senha: ${password}`);
  }

  function navigateToSignUpScreen() {
    navigation.navigate('SignupScreen');
  }
  function navigateToForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen');
  }

  return (
    <Screen scrollable>
      <Text mb="s8" preset="headingLarge">
        Olá
      </Text>
      <Text mb="s40" preset="paragraphLarge">
        Digite seu e-mail e senha para entrar
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        label="Email"
        placeholder="Digite seu e-mail"
        errorMessage={emailErrorMessage}
        boxProps={{ mb: 's20' }}
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{ mb: 's10' }}
      />

      <Text
        onPress={navigateToForgotPasswordScreen}
        color="primary"
        preset="paragraphSmall"
        bold
      >
        Esqueci minha senha
      </Text>

      <Button
        disabled={!!emailErrorMessage || password.length < 6}
        mt="s48"
        title="Entrar"
        onPress={submitForm}
      />
      <Button
        onPress={navigateToSignUpScreen}
        mt="s12"
        title="Criar uma Conta"
        preset="outline"
      />
    </Screen>
  );
}
