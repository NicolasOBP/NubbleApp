import React from 'react';

import { usePostCommentList } from '@domain';

import { Box, Screen, Text } from '@components';
import { AppScreenProps } from '@routes';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  console.log(route.params.postId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { list } = usePostCommentList(route.params.postId);

  return (
    <Screen title="Comentários" canGoBack>
      <Box>
        <Text preset="headingSmall">Tela de Comentários</Text>
      </Box>
    </Screen>
  );
}
