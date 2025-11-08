import React from 'react';

import { RadioButtonSelector, Screen, Text } from '@components';
import { AppScreenProps } from '@routes';

const items = [
  { label: 'Ativado', isSelected: true, onPress: () => {} },
  { label: 'Desativado', isSelected: false, onPress: () => {} },
  {
    label: 'Padrão do sistema',
    description:
      'A aparência será a mesma que você conigurou no seu dispositivo',
    isSelected: false,
    onPress: () => {},
  },
];

export function DarkModeScreen({}: AppScreenProps<'DarkModeScreen'>) {
  return (
    <Screen canGoBack title="Modo Escuro">
      <Text>Dark Mode Screen</Text>
      <RadioButtonSelector items={items} />
    </Screen>
  );
}
