import React from 'react';

import { useUserGetById } from '@domain';

import {
  ActivityIndicator,
  Box,
  ProfileAvatar,
  Screen,
  Text,
} from '@components';
import { AppScreenProps } from '@routes';

export function ProfileScreen({ route }: AppScreenProps<'ProfileScreen'>) {
  const userId = route.params.userId;
  const { user, loading, error } = useUserGetById(userId);

  return (
    <Screen canGoBack>
      {loading && <ActivityIndicator color="primary" />}
      {error && <Text>Erro ao carregar perfil do usuário</Text>}
      {user && (
        <Box alignItems="center">
          <ProfileAvatar
            size={64}
            borderRadius={24}
            imageURL={user?.profileUrl || ''}
          />
          <Text preset="headingMedium">{user?.fullName}</Text>
          <Text>@{user?.username}</Text>
        </Box>
      )}
    </Screen>
  );
}
