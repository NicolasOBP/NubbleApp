import React from 'react';
import { FlatList, Image, ListRenderItemInfo } from 'react-native';

import { Post, usePostList, useUserGetById } from '@domain';

import { Screen } from '@components';

import { ProfileHeader } from './components/ProfileHeader';

type Props = {
  userId: number;
  isMyProfile?: boolean;
};

export function ProfileTemplate({ userId, isMyProfile }: Props) {
  const { list } = usePostList();
  const { user } = useUserGetById(userId);

  function renderItem({ item }: ListRenderItemInfo<Post>) {
    return (
      <Image
        source={{ uri: item.imageURL }}
        style={{ width: 100, height: 100 }}
      />
    );
  }

  function renderListHeader() {
    return user && <ProfileHeader user={user} />;
  }

  return (
    <Screen canGoBack={!isMyProfile} flex={1}>
      <FlatList
        data={list}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
      />
    </Screen>
  );
}
