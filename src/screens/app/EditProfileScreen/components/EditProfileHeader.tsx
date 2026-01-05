import React from 'react';
import { Pressable } from 'react-native';

import { User } from '@domain';

import { Box, ProfileAvatar, Text } from '@components';

type Props = {
  user?: User;
};

export function EditProfileHeader({ user }: Props) {
  function navigateToPhoto() {
    //TODO: navigate to EditPhoto
  }

  if (!user) return null;

  return (
    <Box flexDirection="row" alignItems="center">
      <ProfileAvatar imageURL={user.profileUrl} size={64} borderRadius={24} />

      <Pressable hitSlop={20} onPress={navigateToPhoto}>
        <Text preset="paragraphMedium" bold color="primary" ml="s16">
          Alterar foto
        </Text>
      </Pressable>
    </Box>
  );
}
