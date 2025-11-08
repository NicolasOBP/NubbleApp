import React from 'react';

import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

import { RadioButton, RadioButtonProps } from './RadioButton';

export type RadioButtonItemProps = RadioButtonProps & {
  label: string;
  description?: string;
};

export function RadioButtonItem({
  label,
  description,
  ...radioButtonProps
}: RadioButtonItemProps) {
  return (
    <Box paddingVertical="s16">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text semibold>{label}</Text>
        <RadioButton {...radioButtonProps} />
      </Box>
      {description && (
        <Text width="80%" color="paragraphSecundary">
          {description}
        </Text>
      )}
    </Box>
  );
}
