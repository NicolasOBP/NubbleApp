import React, { useRef } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { useAppTheme } from '@hooks';

import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { $textInputStyle } from '../TextInput/TextInput';

interface TextMessageProps extends RNTextInputProps {
  onPressSend: () => void;
}

export function TextMessage({
  onPressSend,
  value,
  ...rnTextInputProps
}: TextMessageProps) {
  const inputRef = useRef<RNTextInput>(null);
  const { colors } = useAppTheme();

  function focusInput() {
    inputRef.current?.focus();
  }

  const sendIsDisabled = value?.trim().length === 0;

  return (
    <Pressable onPress={focusInput}>
      <Box
        paddingHorizontal="s16"
        paddingVertical="s14"
        bg="gray5"
        borderRadius="s12"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <RNTextInput
          ref={inputRef}
          value={value}
          style={[$textInputStyle, { color: colors.gray1 }]}
          placeholderTextColor={colors.gray2}
          {...rnTextInputProps}
        />

        <Pressable disabled={sendIsDisabled} onPress={onPressSend}>
          <Text color={sendIsDisabled ? 'gray2' : 'primary'} bold>
            Enviar
          </Text>
        </Pressable>
      </Box>
    </Pressable>
  );
}
