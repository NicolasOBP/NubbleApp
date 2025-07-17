import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { PostComment, usePostCommentList } from '@domain';

import { Box, Screen, TextMessage } from '@components';
import { useAppSafeArea } from '@hooks';
import { AppScreenProps } from '@routes';

import { PostCommentBottom, PostCommentItem } from './components';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const { list, fetchNextPage, hasNextPage } = usePostCommentList(
    route.params.postId,
  );
  const { bottom } = useAppSafeArea();

  const [message, setMessage] = useState('');

  function renderItem({ item }: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  function onPressSend() {}

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

        <TextMessage
          placeholder="Adicione um comentário"
          onPressSend={onPressSend}
          value={message}
          onChangeText={setMessage}
        />
      </Box>
    </Screen>
  );
}
