import React from 'react';

import { Box, Text } from '@components';

import { OnboardingPageItem } from '../onboardingData';

type ContentProps = Omit<OnboardingPageItem, 'image'>;
export function Content({ subtitle, title }: ContentProps) {
  return (
    <Box>
      <Text preset="headingLarge">
        {title.map((item, index) => (
          <Text
            key={index}
            preset="headingLarge"
            color={item.highlight ? 'carrotSecondary' : 'backgroundContrast'}
          >
            {item.text}
          </Text>
        ))}
      </Text>
      <Text preset="paragraphLarge">{subtitle}</Text>
    </Box>
  );
}
