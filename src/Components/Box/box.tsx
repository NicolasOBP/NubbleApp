import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import {
  createBox,
  createRestyleComponent,
  backgroundColor,
  spacing,
  layout,
  border,
  spacingShorthand,
  BackgroundColorProps,
  SpacingProps,
  BorderProps,
  SpacingShorthandProps,
  LayoutProps,
} from '@shopify/restyle';

import { Theme } from '@theme';

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

export type TouchableOpacityBoxProps = BackgroundColorProps<Theme> &
  TouchableOpacityProps &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme> &
  LayoutProps<Theme>;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  TouchableOpacity,
);
