import React from 'react';

import { Box, Icon, PressableBox, Text } from '@components';

import { OnboardingPageProps } from './OnboardingPage';

type BottomMenuProps = Omit<OnboardingPageProps, 'pageItem'> & {
  isLast: boolean;
};

export function BottomMenu({
  onPressNext,
  onPressSkip,
  isLast,
}: BottomMenuProps) {
  const nextText = isLast ? 'Começar' : 'Próximo';
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <PressableBox hitSlop={10} onPress={onPressSkip}>
        <Text semibold color="gray2">
          Pular
        </Text>
      </PressableBox>
      <PressableBox
        onPress={onPressNext}
        flexDirection="row"
        alignItems="center"
        hitSlop={10}
      >
        <Text mr="s4" bold>
          {nextText}
        </Text>
        <Icon name="arrowRight" color="carrotSecondary" />
      </PressableBox>
    </Box>
  );
}
