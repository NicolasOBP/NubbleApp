import React from 'react';

import { Post } from '@domain';

import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components';

type Props = Pick<Post, 'commentCount' | 'favoriteCount' | 'reactionCount'>;

export function PostActions({
  commentCount,
  favoriteCount,
  reactionCount,
}: Props) {
  function likePost() {
    // TODO: implement like post
  }

  function navigateToComments() {
    // TODO: implement navigate to comments
  }

  function favoritePost() {
    // TODO: implement favorite post
  }

  return (
    <Box flexDirection="row" mt="s16">
      <Item
        marked
        icon={{ default: 'heart', marked: 'heartFill' }}
        onPress={likePost}
        text={reactionCount}
      />
      <Item
        marked={false}
        icon={{ default: 'comment', marked: 'comment' }}
        onPress={navigateToComments}
        text={commentCount}
      />
      <Item
        marked={false}
        icon={{ default: 'bookmark', marked: 'bookmarkFill' }}
        onPress={favoritePost}
        text={favoriteCount}
      />
    </Box>
  );
}

interface ItemProps {
  onPress: () => void;
  marked: boolean;
  icon: { default: IconProps['name']; marked: IconProps['name'] };
  text: number;
}

function Item({ onPress, icon, marked, text }: ItemProps) {
  return (
    <TouchableOpacityBox
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
