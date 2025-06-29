import React from 'react';

import { Button, Icon, Screen, Text } from '@components';
import { AuthScreenProps } from '@routes';

export function SuccessScreen({
  navigation,
  route,
}: AuthScreenProps<'SuccessScreen'>) {
  function goBackToBegin() {
    //TODO: navegar para home screen
    navigation.goBack();
  }

  return (
    <Screen>
      <Icon {...route.params.icon} />
      <Text preset="headingLarge" mt="s24">
        {route.params.title}
      </Text>
      <Text preset="paragraphLarge" mt="s16">
        {route.params.description}
      </Text>
      <Button onPress={goBackToBegin} mt="s40" title="Voltar para o início" />
    </Screen>
  );
}
