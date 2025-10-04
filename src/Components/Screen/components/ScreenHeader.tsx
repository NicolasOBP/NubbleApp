import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Box, BoxProps, Icon, Text, TouchableOpacityBox } from '@components';

import { ScreenProps } from '../Screen';

type Props = Pick<ScreenProps, 'title' | 'canGoBack' | 'HeaderComponent'> &
  BoxProps;

const ICON_SIZE = 20;
export function ScreenHeader({
  canGoBack,
  title,
  HeaderComponent,
  ...boxProps
}: Props) {
  const navigation = useNavigation();

  if (!canGoBack && !title && !HeaderComponent) {
    return null;
  }

  const showBackLabel = !title && !HeaderComponent;

  return (
    <Box
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      mb="s24"
      {...boxProps}
    >
      {canGoBack && (
        <TouchableOpacityBox
          testID="screen-back-button"
          marginRight="s10"
          onPress={navigation.goBack}
          flexDirection="row"
          alignItems="center"
        >
          <Icon size={ICON_SIZE} name="arrowLeft" color="primary" />

          {showBackLabel && (
            <Text preset="paragraphMedium" semibold ml="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {HeaderComponent}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  );
}
