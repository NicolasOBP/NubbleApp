import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { User } from '@domain';
import { useNavigation } from '@react-navigation/native';

import {
  Text,
  ProfileAvatar,
  PressableBox,
  PressableBoxProps,
  ProfileAvatarProps,
  Box,
} from '@components';

type ProfileUserProps = {
  user: Pick<User, 'username' | 'profileUrl' | 'id'>;
  avatarProps?: Partial<Omit<ProfileAvatarProps, 'imageURL'>>;
  RightComponent?: React.ReactElement;
} & PressableBoxProps;

export function ProfileUser({
  user,
  onPress,
  avatarProps,
  RightComponent,
  ...pressableBoxProps
}: ProfileUserProps) {
  const navigation = useNavigation();

  function navigateToProfileScreen(event: GestureResponderEvent) {
    if (onPress) {
      onPress(event);
    }
    navigation.navigate('ProfileScreen', { userId: user.id });
  }

  return (
    <PressableBox
      flexDirection="row"
      alignItems="center"
      mb="s16"
      justifyContent="space-between"
      onPress={navigateToProfileScreen}
      {...pressableBoxProps}
    >
      <Box flexDirection="row" alignItems="center">
        <ProfileAvatar {...avatarProps} imageURL={user.profileUrl} />
        <Text ml="s12" preset="paragraphMedium" semibold>
          {user.username}
        </Text>
      </Box>
      {RightComponent}
    </PressableBox>
  );
}
