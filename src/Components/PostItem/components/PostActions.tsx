import React from 'react';

import { Post, useReactToPost } from '@domain';
import { QueryKeys } from '@infra';

import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components';
import { useAppNavigation } from '@hooks';

type Props = {
  post: Post;
  hideCommentAction?: boolean;
};

export function PostActions({ post, hideCommentAction }: Props) {
  const navigate = useAppNavigation();
  const likeReaction = useReactToPost({ post, postReactionType: 'like' });
  const favoriteReaction = useReactToPost({
    post,
    postReactionType: 'favorite',
    queryKeys: [QueryKeys.FavoriteList],
  });

  function navigateToComments() {
    navigate.toPostComment({
      postAuthorId: post.author.id,
      postId: post.id,
    });
  }

  return (
    <Box flexDirection="row" mt="s16">
      <Item
        marked={likeReaction.hasReacted}
        icon={{ default: 'heart', marked: 'heartFill' }}
        onPress={likeReaction.reactToPost}
        text={likeReaction.reactionCount}
      />
      <Item
        disabled={hideCommentAction}
        marked={false}
        icon={{ default: 'comment', marked: 'comment' }}
        onPress={navigateToComments}
        text={post.commentCount}
      />
      <Item
        marked={favoriteReaction.hasReacted}
        icon={{ default: 'bookmark', marked: 'bookmarkFill' }}
        onPress={favoriteReaction.reactToPost}
        text={favoriteReaction.reactionCount}
      />
    </Box>
  );
}

interface ItemProps {
  onPress: () => void;
  marked: boolean;
  icon: { default: IconProps['name']; marked: IconProps['name'] };
  text: number;
  disabled?: boolean;
}

function Item({ onPress, icon, marked, text, disabled }: ItemProps) {
  return (
    <TouchableOpacityBox
      disabled={disabled}
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      mr="s24"
    >
      <Icon
        color={marked ? 'marked' : undefined}
        name={marked ? icon.marked : icon.default}
      />
      {text > 0 && (
        <Text preset="paragraphSmall" bold ml="s4">
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
