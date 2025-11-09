import React, { useState } from 'react';

import { RadioButtonSelector, Screen, Text } from '@components';
import { AppScreenProps } from '@routes';

type ThemePreference = 'light' | 'dark' | 'system';

type Option = {
  label: string;
  description?: string;
  themePreference: ThemePreference;
};

const items: Option[] = [
  {
    label: 'Ativado',
    themePreference: 'dark',
  },
  {
    label: 'Desativado',
    themePreference: 'light',
  },
  {
    label: 'Padrão do Sistema',
    themePreference: 'system',
    description:
      'A aparência será a mesma que você conigurou no seu dispositivo',
  },
];

export function DarkModeScreen({}: AppScreenProps<'DarkModeScreen'>) {
  const [selectedItem, setSelectedItem] = useState<Option>();

  return (
    <Screen canGoBack title="Modo Escuro">
      <Text>Dark Mode Screen</Text>
      <RadioButtonSelector
        items={items}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        labelKey={'label'}
        descriptionKey="description"
        valueKey="themePreference"
      />
    </Screen>
  );
}
