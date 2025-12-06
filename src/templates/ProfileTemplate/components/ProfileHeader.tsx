import React from 'react';

import { User } from '@domain';
import { useNavigation } from '@react-navigation/native';

import { Box, Button, Icon, ProfileAvatar, Text } from '@components';

import { ProfileMetaData } from './ProfileMetaData';

type Props = {
  user: User;
  isMyProfile?: boolean;
};

export function ProfileHeader({ user, isMyProfile }: Props) {
  const navigation = useNavigation();

  return (
    <Box paddingHorizontal="s24">
      <Box alignItems="center">
        <ProfileAvatar
          imageURL={user?.profileUrl}
          size={100}
          borderRadius={40}
        />

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

        {isMyProfile && (
          <Box position="absolute" alignSelf="flex-end">
            <Icon
              name="settings"
              size={30}
              onPress={() => navigation.navigate('SettingsScreen')}
            />
          </Box>
        )}
      </Box>
      <Button title="TO DO" marginVertical="s24" />
    </Box>
  );
}
