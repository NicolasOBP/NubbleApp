import React from 'react';

import { Box } from '@components';

import { ImageHeader } from './ImageHeader';

export function OnboardingPage() {
  return (
    <Box flex={1}>
      <Box flex={4} bg="error">
        <ImageHeader />
      </Box>
      <Box flex={5} bg="carrotSecondary" />
      <Box flex={1} bg="success" />
    </Box>
  );
}
