import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Screen, Text } from '@components';
import { AppStackParamList } from '@routes';

type ScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

export function HomeScreen({ navigation }: ScreenProps) {
  return (
    <Screen>
      <Text preset="headingLarge">Home Screen</Text>
      <Button
        onPress={() => navigation.navigate('SettingsScreen')}
        title="Settings"
      />
    </Screen>
  );
}
