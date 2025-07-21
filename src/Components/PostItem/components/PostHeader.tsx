import React from 'react';
import { Pressable } from 'react-native';

import { Post } from '@domain';
import { useNavigation } from '@react-navigation/native';

import { Box, Text, ProfileAvatar } from '@components';

type Props = Pick<Post, 'author'>;

export function PostHeader({ author }: Props) {
  const navigation = useNavigation();

  function navigateToProfileScreen() {
    navigation.navigate('ProfileScreen', { userId: author.id });
  }

  return (
    <Pressable onPress={navigateToProfileScreen}>
      <Box flexDirection="row" alignItems="center" mb="s16">
        <ProfileAvatar imageURL={author.profileURL} />
        <Text ml="s12" preset="paragraphMedium" semibold>
          {author.userName}
        </Text>
      </Box>
    </Pressable>
  );
}
