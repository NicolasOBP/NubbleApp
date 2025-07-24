import { authAdapter } from './authAdapter';
import { authApi } from './authApi';
import { AuthCredentials } from './authTypes';

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentials> {
  try {
    const authCredentialsApi = await authApi.signIn(email, password);

    return authAdapter.toAuthCredentials(authCredentialsApi);
  } catch (error) {
    throw new Error('Email ou senha inválidos');
  }
}

async function signOut(): Promise<string> {
  const message = await authApi.signOut();

  return message;
}

export const authService = { signIn, signOut };
