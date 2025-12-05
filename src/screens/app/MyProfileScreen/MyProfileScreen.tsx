import React from 'react';

import { useAuthCredentials } from '@service';
import { ProfileTemplate } from '@templates';

import { AppTabScreenProps } from '@routes';

export function MyProfileScreen({}: AppTabScreenProps<'MyProfileScreen'>) {
  const { userId } = useAuthCredentials();

  if (!userId) {
    return null;
  }

  return <ProfileTemplate userId={userId} />;
}
