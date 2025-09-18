import React from 'react';
import { Pressable } from 'react-native';

import { User } from '@domain';
import { useNavigation } from '@react-navigation/native';

import { Box, Text, ProfileAvatar } from '@components';

type ProfileUserProps = { user: Pick<User, 'username' | 'profileUrl' | 'id'> };

export function ProfileUser({ user }: ProfileUserProps) {
  const navigation = useNavigation();

  function navigateToProfileScreen() {
    navigation.navigate('ProfileScreen', { userId: user.id });
  }

  return (
    <Pressable onPress={navigateToProfileScreen}>
      <Box flexDirection="row" alignItems="center" mb="s16">
        <ProfileAvatar imageURL={user.profileUrl} />
        <Text ml="s12" preset="paragraphMedium" semibold>
          {user.username}
        </Text>
      </Box>
    </Pressable>
  );
}
