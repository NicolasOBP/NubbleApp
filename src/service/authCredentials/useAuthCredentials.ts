import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from '../storage';

import { AuthCredentialsService } from './authCredentialsType';

export function useAuthCredentials(): AuthCredentialsService {
  // TODO:

  return useAuthCredentialsZustand();
}

const useAuthCredentialsZustand = create<AuthCredentialsService>()(
  persist(
    set => ({
      authCredentials: null,
      saveCredentials: async ac => set({ authCredentials: ac }),
      removeCredentials: async () => set({ authCredentials: null }),
      isLoading: false,
    }),
    {
      name: '@Auth',
      storage: storage,
    },
  ),
);
