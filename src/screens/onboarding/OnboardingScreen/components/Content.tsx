import React from 'react';

import { Box, Text } from '@components';

import { OnboardingPageItem } from '../onboardingData';

type ContentProps = Omit<OnboardingPageItem, 'image'>;
export function Content({ subtitle, title }: ContentProps) {
  return (
    <Box>
      <Text preset="headingLarge">{title}</Text>
      <Text preset="paragraphLarge">{subtitle}</Text>
    </Box>
  );
}
