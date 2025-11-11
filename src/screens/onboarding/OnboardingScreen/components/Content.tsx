import React from 'react';

import { Box, ProgressIndicator, Text } from '@components';

import { OnboardingPageItem } from '../onboardingData';

type ContentProps = Omit<OnboardingPageItem, 'image'>;
export function Content({ subtitle, title, index, total }: ContentProps) {
  return (
    <Box>
      <ProgressIndicator total={total} currentIndex={index} mb="s24" />
      <Text preset="headingLarge">
        {title.map((item, _index) => (
          <Text
            key={_index}
            preset="headingLarge"
            color={item.highlight ? 'carrotSecondary' : 'backgroundContrast'}
          >
            {item.text}
          </Text>
        ))}
      </Text>
      <Text mt="s16" preset="paragraphLarge">
        {subtitle}
      </Text>
    </Box>
  );
}
