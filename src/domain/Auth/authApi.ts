import { API } from '@api';

import { AuthCredentialsAPI } from './authTypes';

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const response = await API.post<AuthCredentialsAPI>('/login', {
    email,
    password,
  });

  return response.data;
}

async function signOut(): Promise<string> {
  const response = await API.get<string>('/profile/logout');

  return response.data;
}

export const authApi = {
  signIn,
  signOut,
};
