import { API } from '@api';
import { AxiosRequestConfig } from 'axios';

import { UserAPI } from '../User';

import {
  AuthCredentialsAPI,
  FieldIsAvailableAPI,
  ForgotPasswordParam,
  SignUpDataAPI,
} from './authTypes';

const REFRESH_TOKEN_URL = 'auth/refresh-token';

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const response = await API.post<AuthCredentialsAPI>('auth/login', {
    email,
    password,
  });

  return response.data;
}

async function signUp(data: SignUpDataAPI): Promise<UserAPI> {
  const response = await API.post<UserAPI>('auth/register', data);

  return response.data;
}

async function signOut(): Promise<string> {
  const response = await API.get<string>('auth/profile/logout');

  return response.data;
}

async function isUserNameAvailable(params: {
  username: string;
}): Promise<FieldIsAvailableAPI> {
  const response = await API.get<FieldIsAvailableAPI>(
    'auth/validate-username',
    {
      params,
    },
  );

  return response.data;
}

async function isEmailAvailable(params: {
  email: string;
}): Promise<FieldIsAvailableAPI> {
  const response = await API.get<FieldIsAvailableAPI>('auth/validate-email', {
    params,
  });

  return response.data;
}

async function forgotPassword(
  params: ForgotPasswordParam,
): Promise<{ message: string }> {
  const response = await API.post<{ message: string }>(
    'auth/forgot-password',
    params,
  );

  return response.data;
}

async function refreshToken(token: string): Promise<AuthCredentialsAPI> {
  const response = await API.post<AuthCredentialsAPI>(REFRESH_TOKEN_URL, {
    refreshToken: token,
  });

  return response.data;
}

function isRefreshTokenRequest(resquest: AxiosRequestConfig): boolean {
  const url = resquest.url;
  return url === REFRESH_TOKEN_URL;
}

export const authApi = {
  signIn,
  signOut,
  signUp,
  isUserNameAvailable,
  isEmailAvailable,
  forgotPassword,
  refreshToken,
  isRefreshTokenRequest,
};
