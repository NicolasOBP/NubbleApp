import { API } from '@api';

import { authAdapter } from './authAdapter';
import { authApi } from './authApi';
import { AuthCredentials, SignUpData } from './authTypes';

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

async function signUp(signUpData: SignUpData): Promise<void> {
  await authApi.signUp(signUpData);
}

function updateToken(token: string) {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeToken() {
  API.defaults.headers.common.Authorization = null;
}

async function isUserNameAvailable(username: string): Promise<boolean> {
  const { isAvailable } = await authApi.isUserNameAvailable({ username });

  return isAvailable;
}

async function isEmailAvailable(email: string): Promise<boolean> {
  const { isAvailable } = await authApi.isEmailAvailable({ email });

  return isAvailable;
}

async function forgotPassword(email: string): Promise<string> {
  const { message } = await authApi.forgotPassword({ email });
  return message;
}

async function authenticateByRefreshToken(
  refreshToken: string,
): Promise<AuthCredentials> {
  const acAPI = await authApi.refreshToken(refreshToken);

  return authAdapter.toAuthCredentials(acAPI);
}

export const authService = {
  signIn,
  signOut,
  updateToken,
  removeToken,
  signUp,
  isUserNameAvailable,
  isEmailAvailable,
  forgotPassword,
  authenticateByRefreshToken,
  isRefreshTokenRequest: authApi.isRefreshTokenRequest,
};
