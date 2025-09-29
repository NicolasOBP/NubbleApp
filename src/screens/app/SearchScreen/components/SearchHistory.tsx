import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { User } from '@domain';
import { useSearchHistory, useSearchHistoryService } from '@service';

import { Icon, ProfileUser, Text } from '@components';

export function SearchHistory() {
  const userList = useSearchHistory();
  const { removeUser } = useSearchHistoryService();

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        avatarProps={{ size: 48 }}
        user={item}
        RightComponent={
          <Icon
            color="primary"
            name="trash"
            onPress={() => removeUser(item.id)}
          />
        }
      />
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <Text preset="headingMedium" mb="s16">
          Buscas Recentes
        </Text>
      }
      data={userList}
      renderItem={renderItem}
    />
  );
}
