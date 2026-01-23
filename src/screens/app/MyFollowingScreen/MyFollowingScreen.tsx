import React, { useState } from 'react';
import { ListRenderItemInfo } from 'react-native';

import { followService, FollowUser } from '@domain';
import { QueryKeys } from '@infra';

import {
  Button,
  InfinityScrollList,
  ProfileUser,
  Screen,
  Text,
} from '@components';

export function MyFollowingScreen() {
  const [totalUser, setTotalUser] = useState<number | null>(null);
  function renderItem({ item }: ListRenderItemInfo<FollowUser>) {
    return (
      <ProfileUser
        user={item}
        RightComponent={
          <Button
            title="Seguindo"
            onPress={() => {
              console.log('teste');
            }}
            preset="gray"
          />
        }
      />
    );
  }

  function renderListHeader() {
    if (!totalUser) return null;

    return (
      <Text semibold preset="paragraphSmall" color="primary" mb="s24">
        {totalUser} seguindo
      </Text>
    );
  }

  async function getList(page: number) {
    const response = await followService.getMyFollowingList(page);
    setTotalUser(response.meta.total);
    return response;
  }

  return (
    <Screen flex={1} title="Seguindo" canGoBack>
      <InfinityScrollList
        getList={getList}
        querKey={[QueryKeys.MyFollowingList]}
        renderItem={renderItem}
        flatListProps={{ ListHeaderComponent: renderListHeader }}
      />
    </Screen>
  );
}
