import React from 'react';
import { Image, ListRenderItemInfo } from 'react-native';

import { PostReaction, postReactionService } from '@domain';
import { QueryKeys } from '@infra';

import { InfinityScrollList, Screen, Text } from '@components';
import { AppTabScreenProps } from '@routes';

export function FavoriteScreen({}: AppTabScreenProps<'FavoriteScreen'>) {
  function renderItem({ item }: ListRenderItemInfo<PostReaction>) {
    return (
      <Image
        source={{ uri: item.post.imageURL }}
        style={{ width: 300, height: 300 }}
      />
    );
  }

  return (
    <Screen flex={1}>
      <Text preset="headingSmall">Favorite Screen</Text>
      <InfinityScrollList
        querKey={QueryKeys.FavoriteList}
        getList={page => postReactionService.getMyReactions(page, 'favorite')}
        renderItem={renderItem}
        emptyListProps={{
          emptyMessage: 'Não há favoritos',
          errorMessage: 'Erro ao carregar favoritos',
        }}
      />
    </Screen>
  );
}
