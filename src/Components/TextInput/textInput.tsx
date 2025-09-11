import React, { useRef } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import { useAppTheme } from '@hooks';

import { Box, BoxProps } from '../Box/Box';
import { $fontFamily, $fontSizes, Text } from '../Text/Text';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RighComponent?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  boxProps?: BoxProps;
}

export function TextInput({
  label,
  errorMessage,
  RighComponent,
  boxProps,
  LeftComponent,
  ...textInputProps
}: TextInputProps) {
  const { colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const $textInputContainer: BoxProps = {
    flexDirection: 'row',
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : 'gray4',
    borderRadius: 's12',
    padding: 's16',
  };

  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset="paragraphMedium" marginBottom="s4">
            {label}
          </Text>
        )}

        <Box {...$textInputContainer}>
          {LeftComponent && (
            <Box justifyContent="center" mr="s16">
              {LeftComponent}
            </Box>
          )}

          <RNTextInput
            autoCapitalize="none"
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            style={$textInputStyle}
            {...textInputProps}
          />

          {RighComponent && (
            <Box justifyContent="center" ml="s16">
              {RighComponent}
            </Box>
          )}
        </Box>
        {errorMessage && (
          <Text preset="paragraphSmall" bold color="error">
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  );
}

export const $textInputStyle: TextStyle = {
  flexGrow: 1,
  flexShrink: 1,
  padding: 0,
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
