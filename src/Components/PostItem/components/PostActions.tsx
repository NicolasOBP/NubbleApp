import React from 'react';

import { Post } from '@domain';
import { useNavigation } from '@react-navigation/native';

import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components';

type Props = Pick<Post, 'commentCount' | 'favoriteCount' | 'reactionCount'> & {
  hideCommentAction?: boolean;
};

export function PostActions({
  commentCount,
  favoriteCount,
  reactionCount,
  hideCommentAction,
}: Props) {
  const navigation = useNavigation();
  function likePost() {
    // TODO: implement like post
  }

  function navigateToComments() {
    // TODO: implement navigate to comments
    navigation.navigate('PostCommentScreen', { postAuthorId: 10, postId: 10 });
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
        disabled={hideCommentAction}
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
