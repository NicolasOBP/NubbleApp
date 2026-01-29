import React from 'react';

import { followService, useRemoveFollow } from '@domain';
import { QueryKeys } from '@infra';
import { useToastService } from '@service';
import { UserListTemplate } from '@templates';

export function MyFollowersScreen() {
  const { showToast } = useToastService();
  const { removeFollow } = useRemoveFollow({
    onSuccess: () => {
      showToast({
        message: 'Seguidor removido',
        type: 'success',
        position: 'bottom',
      });
    },
  });

  return (
    <UserListTemplate
      button={{
        onPress: followUser => removeFollow({ followId: followUser.followId }),
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
