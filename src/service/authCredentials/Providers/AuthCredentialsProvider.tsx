import React, { createContext, useEffect, useState } from 'react';

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

  async function startAuthCredentials() {
    try {
      const ac = await authCredentialsStorage.get();

      if (ac) {
        console.log(ac);
        console.log(ac.token);

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
