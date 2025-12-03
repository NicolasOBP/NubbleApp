import React from 'react';
import { Dimensions, Image, ListRenderItemInfo } from 'react-native';

import { PostReaction, postReactionService } from '@domain';
import { QueryKeys } from '@infra';

import { InfinityScrollList, PressableBox, Screen, Text } from '@components';
import { AppTabScreenProps } from '@routes';

const NUMBER_COL = 2;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_PADDING = 24;
const ITEM_PADDING = 16;
const ITEM_WIDTH =
  (SCREEN_WIDTH - SCREEN_PADDING * 2 - ITEM_PADDING) / NUMBER_COL;

export function FavoriteScreen({
  navigation,
}: AppTabScreenProps<'FavoriteScreen'>) {
  function renderItem({ item }: ListRenderItemInfo<PostReaction>) {
    return (
      <PressableBox
        onPress={() =>
          navigation.navigate('PostCommentScreen', {
            postId: item.postId,
            postAuthorId: item.author.id,
            showPost: true,
          })
        }
      >
        <Image
          source={{ uri: item.post.imageURL }}
          style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
        />
        <Text mt="s4" semibold>
          {item.author.username}
        </Text>
      </PressableBox>
    );
  }

  return (
    <Screen flex={1} title="Favoritos">
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
