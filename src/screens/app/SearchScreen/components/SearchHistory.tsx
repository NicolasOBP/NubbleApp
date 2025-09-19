import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { User } from '@domain';
import { useSearchHistory } from '@service';

import { ProfileUser, Text } from '@components';

export function SearchHistory() {
  const userList = useSearchHistory();
  function renderItem({ item }: ListRenderItemInfo<User>) {
    return <ProfileUser user={item} />;
  }

  return (
    <FlatList
      ListHeaderComponent={<Text preset="headingMedium">Buscas Recentes</Text>}
      data={userList}
      renderItem={renderItem}
    />
  );
}
