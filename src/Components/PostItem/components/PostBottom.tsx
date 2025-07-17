import React from 'react';

import { Post } from '@domain';
import { useNavigation } from '@react-navigation/native';

import { Box, Text } from '@components';

type Props = Pick<Post, 'author' | 'commentCount' | 'text' | 'id'>;

export function PostBottom({ author, commentCount, text, id }: Props) {
  const naviation = useNavigation();
  function navigateToPostCommentScreen() {
    naviation.navigate('PostCommentScreen', { postId: id });
  }

  const commentText = getCommentText(commentCount);

  return (
    <Box mt="s16">
      <Text preset="paragraphMedium" bold>
        {author.userName}
      </Text>

      <Text preset="paragraphMedium" semibold color="gray1">
        {text}
      </Text>

      {commentText && (
        <Text
          mt="s8"
          onPress={navigateToPostCommentScreen}
          preset="paragraphSmall"
          bold
          color="primary"
        >
          {commentText}
        </Text>
      )}
    </Box>
  );
}

function getCommentText(commentCount: number): string | null {
  if (commentCount === 0) {
    return null;
  } else if (commentCount === 1) {
    return 'ver comentário';
  } else {
    return `ver ${commentCount} comentários`;
  }
}
