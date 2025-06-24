import React from 'react';
import { Box } from '../Box/Box';
('react-native-safe-area-context');
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAppSafeArea } from '../../hooks/useAppSafeArea';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import {
  ScroolViewContainer,
  ViewContaienr,
} from './components/ScreenContainer';
import { useAppTheme } from '../../hooks/useAppTheme';

interface ScreenProps {
  children: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
}

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
}: ScreenProps) {
  const { top, bottom } = useAppSafeArea();
  const { colors } = useAppTheme();

  const Container = scrollable ? ScroolViewContainer : ViewContaienr;

  console.log({
    device: Platform.OS,
    pad: top,
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal="s24"
          style={{ paddingTop: top, paddingBottom: bottom }}
        >
          {canGoBack && (
            <Box mb="s24" flexDirection="row">
              <Icon name="arrowLeft" color="primary" />
              <Text preset="paragraphMedium" semibold ml="s8">
                Voltar
              </Text>
            </Box>
          )}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
