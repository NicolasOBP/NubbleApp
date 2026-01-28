import React from 'react';

import { useFollowUser } from '@domain';
import { useNavigation } from '@react-navigation/native';

import { Button, ButtonProps } from '@components';

type ButtonVariants =
  | 'myProfile'
  | 'isFollowing'
  | 'isNotFollowing'
  | 'loading';

const buttonVariants: Record<
  ButtonVariants,
  Pick<ButtonProps, 'title' | 'preset' | 'loading'>
> = {
  myProfile: {
    title: 'Editar Perfil',
    preset: 'gray',
  },
  isFollowing: {
    title: 'Mensagem',
    preset: 'primary',
  },
  isNotFollowing: {
    title: 'Seguir',
    preset: 'outline',
  },
  loading: {
    title: 'Carregando...',
    preset: 'outline',
    loading: true,
  },
};

type ProfileButtonProps = {
  isMyProfile?: boolean;
  isFollowing?: boolean;
  userId: number;
};

export function ProfileButton({
  isFollowing,
  isMyProfile,
  userId,
}: ProfileButtonProps) {
  const { followUser, isLoading } = useFollowUser();
  const navigation = useNavigation();
  const variant = getVariants({ isFollowing, isMyProfile, isLoading });
  const buttonProps = buttonVariants[variant];

  function handleOnPress() {
    switch (variant) {
      case 'myProfile': {
        navigation.navigate('EditProfileScreen', { userId: userId });
        break;
      }
      case 'isFollowing': {
        //TODO: navigation.navigate("ChatScreen", {usereId})
        break;
      }
      case 'isNotFollowing': {
        followUser(userId);
        break;
      }
    }
  }

  return (
    <Button marginVertical="s24" onPress={handleOnPress} {...buttonProps} />
  );
}

function getVariants({
  isFollowing,
  isMyProfile,
  isLoading,
}: Pick<ProfileButtonProps, 'isFollowing' | 'isMyProfile'> & {
  isLoading: boolean;
}): ButtonVariants {
  if (isMyProfile) return 'myProfile';
  if (isFollowing) return 'isFollowing';
  if (isLoading) return 'loading';
  return 'isNotFollowing';
}
