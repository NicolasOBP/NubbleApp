import React, { useState } from 'react';

import { Icon, Screen, Text, TextInput } from '@components';
import { AppScreenProps } from '@routes';

export function SearchScreen({}: AppScreenProps<'SearchScreen'>) {
  const [value, setValue] = useState('');

  return (
    <Screen
      canGoBack
      HeaderComponent={
        <TextInput
          LeftComponent={<Icon name="search" color="gray3" />}
          value={value}
          onChangeText={setValue}
        />
      }
    >
      <Text>SearchScreen</Text>
    </Screen>
  );
}
