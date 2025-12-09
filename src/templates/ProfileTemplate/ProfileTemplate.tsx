import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Post, postService, useUserGetById } from '@domain';
import { QueryKeys } from '@infra';
import { Page } from '@types';

import { InfinityScrollList, Screen } from '@components';

import { ProfileHeader } from './components/ProfileHeader';

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS;

type Props = {
  userId: number;
  isMyProfile?: boolean;
};

export function ProfileTemplate({ userId, isMyProfile }: Props) {
  const { user } = useUserGetById(userId);
  const [publicationCount, setPublicationCount] = useState(0);

  function renderItem({ item }: ListRenderItemInfo<Post>) {
    return (
      <Image
        source={{ uri: item.imageURL }}
        style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
      />
    );
  }

  function renderListHeader() {
    return (
      user && (
        <ProfileHeader
          user={user}
          isMyProfile={isMyProfile}
          publicationCount={publicationCount}
        />
      )
    );
  }

  async function getList(page: number): Promise<Page<Post>> {
    const response = await postService.getList(page, userId);
    setPublicationCount(response.meta.total);
    return response;
  }

  return (
    <Screen canGoBack={!isMyProfile} flex={1} style={$screen}>
      <InfinityScrollList
        querKey={[QueryKeys.PostList, userId]}
        getList={getList}
        renderItem={renderItem}
        flatListProps={{
          ListHeaderComponent: renderListHeader,
          numColumns: NUM_COLUMNS,
        }}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingHorizontal: 0,
};
