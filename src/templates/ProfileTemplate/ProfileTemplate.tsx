import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Post, usePostList, useUserGetById } from '@domain';

import { Screen } from '@components';

import { ProfileHeader } from './components/ProfileHeader';

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS;

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
        style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
      />
    );
  }

  function renderListHeader() {
    return user && <ProfileHeader user={user} isMyProfile={isMyProfile} />;
  }

  return (
    <Screen canGoBack={!isMyProfile} flex={1} style={$screen}>
      <FlatList
        data={list}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        numColumns={NUM_COLUMNS}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingHorizontal: 0,
};
