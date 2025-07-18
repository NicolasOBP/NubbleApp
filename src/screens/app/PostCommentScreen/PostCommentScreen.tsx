import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { PostComment, usePostCommentList } from '@domain';

import { Box, Screen } from '@components';
import { useAppSafeArea } from '@hooks';
import { AppScreenProps } from '@routes';

import {
  PostCommentBottom,
  PostCommentItem,
  PostCommentTextMessage,
} from './components';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const postId = route.params.postId;
  const { list, fetchNextPage, hasNextPage } = usePostCommentList(
    route.params.postId,
  );
  const { bottom } = useAppSafeArea();

  function renderItem({ item }: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  return (
    <Screen flex={1} title="Comentários" canGoBack>
      <Box flex={1} justifyContent="space-between">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={renderItem}
          ListFooterComponent={
            <PostCommentBottom
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          }
          ListFooterComponentStyle={{ paddingBottom: bottom }}
        />

        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  );
}
