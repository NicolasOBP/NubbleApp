import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { useAuthSignOut } from '@domain';

import { Button, Screen, Separator } from '@components';
import { AppScreenProps } from '@routes';

import { MenuItem, MenuItemProps } from './components/MenuItem';

export function SettingsScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AppScreenProps<'SettingsScreen'>) {
  const { signOut, isLoading } = useAuthSignOut();

  const items: MenuItemProps[] = [
    { label: 'Termo de Uso', onPress: () => {} },
    { label: 'Política de Privacidade', onPress: () => {} },
    { label: 'Modo Escuro', onPress: () => {} },
  ];

  function renderItem({ item }: ListRenderItemInfo<MenuItemProps>) {
    return <MenuItem {...item} />;
  }

  return (
    <Screen canGoBack title="Configurações" flex={1}>
      <FlatList
        data={items}
        bounces={false}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={
          <Button
            mt="s48"
            loading={isLoading}
            title="Sair da conta"
            onPress={signOut}
          />
        }
      />
    </Screen>
  );
}
