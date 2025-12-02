import React from 'react';
import { Dimensions, Image, ListRenderItemInfo } from 'react-native';

import { PostReaction, postReactionService } from '@domain';
import { QueryKeys } from '@infra';

import { Box, InfinityScrollList, Screen, Text } from '@components';
import { AppTabScreenProps } from '@routes';

const NUMBER_COL = 2;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_PADDING = 24;
const ITEM_PADDING = 16;
const ITEM_WIDTH =
  (SCREEN_WIDTH - SCREEN_PADDING * 2 - ITEM_PADDING) / NUMBER_COL;

export function FavoriteScreen({}: AppTabScreenProps<'FavoriteScreen'>) {
  function renderItem({ item }: ListRenderItemInfo<PostReaction>) {
    return (
      <Box>
        <Image
          source={{ uri: item.post.imageURL }}
          style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
        />
        <Text semibold>{item.author.username}</Text>
      </Box>
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
        flatListProps={{
          numColumns: NUMBER_COL,
          columnWrapperStyle: { columnGap: ITEM_PADDING },
          contentContainerStyle: { rowGap: SCREEN_PADDING },
        }}
      />
    </Screen>
  );
}
