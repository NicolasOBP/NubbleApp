import React from 'react';

import { UserDetails } from '@domain';
import { useNavigation } from '@react-navigation/native';

import { BackButton, Box, Icon, ProfileAvatar, Text } from '@components';

import { ProfileButton } from './ProfileButton';
import { ProfileMetaData } from './ProfileMetaData';

type Props = {
  user: UserDetails;
  isMyProfile?: boolean;
  publicationCount: number;
};

export function ProfileHeader({ user, isMyProfile, publicationCount }: Props) {
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
          followersCount={user.meta.followersCount}
          followingCount={user.meta.followingCount}
          publicationCount={publicationCount.toString()}
        />

        {isMyProfile ? (
          <Box position="absolute" alignSelf="flex-end">
            <Icon
              name="settings"
              size={30}
              onPress={() => navigation.navigate('SettingsScreen')}
            />
          </Box>
        ) : (
          <Box left={-24} position="absolute" alignSelf="flex-start">
            <BackButton showBackLabel />
          </Box>
        )}
      </Box>
      <ProfileButton
        userId={user.id}
        isFollowing={user.isFollowing}
        isMyProfile={isMyProfile}
      />
    </Box>
  );
}
