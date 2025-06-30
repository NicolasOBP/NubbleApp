import React from 'react';
import { Image } from 'react-native';

import { Post } from '@domain';

import { Box, Text } from '@components';

type Props = Pick<Post, 'author'>;

export function PostHeader({ author }: Props) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s16">
      <Image
        style={{ borderRadius: 14 }}
        source={{ uri: author.profileURL }}
        width={32}
        height={32}
      />
      <Text ml="s12" preset="paragraphMedium" semibold>
        {author.userName}
      </Text>
    </Box>
  );
}
