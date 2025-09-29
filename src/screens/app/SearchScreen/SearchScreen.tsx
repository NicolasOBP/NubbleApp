import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { User, useUserSearch } from '@domain';
import { useSearchHistoryService } from '@service';

import { Icon, ProfileUser, Screen, TextInput } from '@components';
import { useDebounce } from '@hooks';
import { AppScreenProps } from '@routes';

import { SearchHistory } from './components/SearchHistory';

export function SearchScreen({}: AppScreenProps<'SearchScreen'>) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1500);
  const { list } = useUserSearch(debouncedSearch);
  const { addUser } = useSearchHistoryService();

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return <ProfileUser onPress={() => addUser(item)} user={item} />;
  }

  return (
    <Screen
      canGoBack
      HeaderComponent={
        <TextInput
          placeholder="Digite sua busca"
          LeftComponent={<Icon name="search" color="gray3" />}
          value={search}
          onChangeText={setSearch}
        />
      }
    >
      {search.length === 0 ? (
        <SearchHistory />
      ) : (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.username}
        />
      )}
    </Screen>
  );
}
