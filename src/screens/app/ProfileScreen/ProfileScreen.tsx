import React from 'react';

import { ProfileTemplate } from '@templates';

import { AppScreenProps } from '@routes';

export function ProfileScreen({ route }: AppScreenProps<'ProfileScreen'>) {
  const userId = route.params.userId;

  return <ProfileTemplate userId={userId} />;
}
