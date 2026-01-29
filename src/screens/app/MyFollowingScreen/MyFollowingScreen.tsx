import React from 'react';

import { followService, useRemoveFollow } from '@domain';
import { QueryKeys } from '@infra';
import { useToastService } from '@service';
import { UserListTemplate } from '@templates';

export function MyFollowingScreen() {
  const { showToast } = useToastService();
  const { removeFollow, isLoading, undoRemoveFollow } = useRemoveFollow({
    onSuccess: () => {
      showToast({
        message: 'Deixou de seguir',
        type: 'success',
        position: 'bottom',
        action: {
          title: 'Desfazer',
          onPress: undoRemoveFollow,
        },
      });
    },
  });

  return (
    <UserListTemplate
      button={{
        onPress: followUser =>
          removeFollow({
            followId: followUser.followId,
            userId: followUser.id,
          }),
        title: 'Seguindo',
        loading: isLoading,
      }}
      emptyMessage="Você ainda não está seguindo ninguém"
      getUserList={followService.getMyFollowingList}
      queryKey={QueryKeys.MyFollowingList}
      screenTitle="Seguindo"
      totalText="seguindo"
    />
  );
}
