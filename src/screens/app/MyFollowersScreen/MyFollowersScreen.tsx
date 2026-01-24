import React from 'react';

import { followService } from '@domain';
import { QueryKeys } from '@infra';
import { UserListTemplate } from '@templates';

export function MyFollowersScreen() {
  return (
    <UserListTemplate
      button={{
        onPress: followUser => console.log(followUser),
        title: 'Remover',
      }}
      emptyMessage="Você ainda não tem nenhum seguidor"
      getUserList={followService.getMyFollowersList}
      queryKey={QueryKeys.MyFollowersList}
      screenTitle="Seguidores"
      totalText="seguidores"
    />
  );
}
