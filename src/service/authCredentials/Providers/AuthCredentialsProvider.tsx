import React, { createContext, useEffect, useState } from 'react';

import { API } from '@api';
import { AuthCredentials, authService } from '@domain';

import { authCredentialsStorage } from '../authCredentialsStorage';
import { AuthCredentialsService } from '../authCredentialsType';

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: true,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});
export function AuthCredentialsProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startAuthCredentials();
  }, []);

  useEffect(() => {
    const interceptor = API.interceptors.response.use(
      response => response,
      async responseError => {
        if (responseError.response.status === 401) {
          console.log(responseError.response.status);

          if (!authCredentials?.refreshToken) {
            removeCredentials();

            return Promise.reject(responseError);
          }

          const failedRequest = responseError.config;

          const newAuthCredentions =
            await authService.authenticateByRefreshToken(
              authCredentials?.refreshToken,
            );
          saveCredentials(newAuthCredentions);

          failedRequest.headers.Authorization = `Bearer ${newAuthCredentions.token}`;

          return API(failedRequest);
        }
      },
    );

    return () => API.interceptors.response.eject(interceptor);
  }, [authCredentials?.refreshToken]);

  async function startAuthCredentials() {
    try {
      const ac = await authCredentialsStorage.get();

      if (ac) {
        authService.updateToken(ac.token);
        setAuthCredentials(ac);
      }
    } catch (error) {
      // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCredentials(ac: AuthCredentials): Promise<void> {
    authCredentialsStorage.set(ac);
    authService.updateToken(ac.token);

    setAuthCredentials(ac);
  }
  async function removeCredentials(): Promise<void> {
    authCredentialsStorage.remove();
    authService.removeToken();

    setAuthCredentials(null);
  }

  return (
    <AuthCredentialsContext.Provider
      value={{ authCredentials, isLoading, saveCredentials, removeCredentials }}
    >
      {children}
    </AuthCredentialsContext.Provider>
  );
}
