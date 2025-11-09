import React from 'react';

import { Box, PressableBox } from '../Box/Box';

export type RadioButtonProps = {
  isSelected: boolean;
  onPress: () => void;
};

export function RadioButton({ isSelected, onPress }: RadioButtonProps) {
  return (
    <PressableBox
      hitSlop={10}
      justifyContent="center"
      alignItems="center"
      height={20}
      width={20}
      borderWidth={isSelected ? 2 : 1}
      borderRadius="s16"
      onPress={onPress}
      borderColor={isSelected ? 'primary' : 'onBackgroundGray2'}
    >
      <Box
        opacity={isSelected ? 1 : 0}
        backgroundColor="primary"
        height={12}
        width={12}
        borderRadius="s16"
      />
    </PressableBox>
  );
}
