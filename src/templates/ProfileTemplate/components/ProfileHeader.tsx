import React from 'react';

import { User } from '@domain';

import { Box, ProfileAvatar, Text } from '@components';

import { ProfileMetaData } from './ProfileMetaData';

type Props = {
  user: User;
};

export function ProfileHeader({ user }: Props) {
  return (
    <Box alignItems="center">
      <ProfileAvatar imageURL={user?.profileUrl} size={100} borderRadius={40} />
      <Text preset="headingMedium" mt="s16">
        {user.fullName}
      </Text>
      <Text preset="paragraphLarge" mt="s4" color="gray1">
        @{user.username}
      </Text>

      <ProfileMetaData
        followersCount="10"
        followingCount="20"
        publicationCount="10"
      />
    </Box>
  );
}
