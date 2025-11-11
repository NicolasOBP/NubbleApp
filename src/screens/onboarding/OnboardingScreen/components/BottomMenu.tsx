import React from 'react';

import { Box, Icon, PressableBox, Text } from '@components';

import { OnboardingPageProps } from './OnboardingPage';

type BottomMenuProps = Omit<OnboardingPageProps, 'pageItem'>;

export function BottomMenu({ onPressNext, onPressSkip }: BottomMenuProps) {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <PressableBox hitSlop={10} onPress={onPressSkip}>
        <Text>Pular</Text>
      </PressableBox>
      <PressableBox
        onPress={onPressNext}
        flexDirection="row"
        alignItems="center"
        hitSlop={10}
      >
        <Text mr="s4">Próximo</Text>
        <Icon name="arrowRight" />
      </PressableBox>
    </Box>
  );
}
