import React from 'react';
import { FlatList, Image, ListRenderItemInfo } from 'react-native';

import { Post, usePostList, useUserGetById } from '@domain';

import { Box, ProfileAvatar, Screen, Text } from '@components';

type Props = {
  userId: number;
};

export function ProfileTemplate({ userId }: Props) {
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
    return (
      user && (
        <Box>
          <ProfileAvatar imageURL={user?.profileUrl} />
          <Text>{user.fullName}</Text>
          <Text>@{user.username}</Text>
        </Box>
      )
    );
  }

  return (
    <Screen canGoBack flex={1}>
      <FlatList
        data={list}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
      />
    </Screen>
  );
}
