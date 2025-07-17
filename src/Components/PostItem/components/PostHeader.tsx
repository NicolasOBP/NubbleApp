import React from 'react';

import { Post } from '@domain';

import { Box, Text, ProfileAvatar } from '@components';

type Props = Pick<Post, 'author'>;

export function PostHeader({ author }: Props) {
  return (
    <Box flexDirection="row" alignItems="center" mb="s16">
      <ProfileAvatar imageURL={author.profileURL} />
      <Text ml="s12" preset="paragraphMedium" semibold>
        {author.userName}
      </Text>
    </Box>
  );
}
