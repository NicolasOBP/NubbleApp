import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from '../storage';

import { SearchHistoryService } from './searchHistoryType';

const userSearchHistoryStore = create<SearchHistoryService>()(
  persist(
    (set, get) => ({
      userList: [],
      addUser: user => {
        const userList = get().userList;

        const useExist = userList.find(item => item.id === user.id);

        if (!useExist) {
          const updatedList = [...userList, user];
          set({ userList: updatedList });
        }
      },
      removeUser: userId => {
        const userList = get().userList;
        const updatedList = userList.filter(user => user.id !== userId);
        set({ userList: updatedList });
      },
      clearUserList: () => {
        set({ userList: [] });
      },
    }),
    {
      name: '@searchHistory',
      storage: storage,
    },
  ),
);

export function useSearchHistory(): SearchHistoryService['userList'] {
  const userList = userSearchHistoryStore(state => state.userList);
  return userList;
}

export function useSearchHistoryService(): Omit<
  SearchHistoryService,
  'userList'
> {
  const addUser = userSearchHistoryStore(state => state.addUser);
  const removeUser = userSearchHistoryStore(state => state.removeUser);
  const clearUserList = userSearchHistoryStore(state => state.clearUserList);

  return {
    addUser,
    clearUserList,
    removeUser,
  };
}
