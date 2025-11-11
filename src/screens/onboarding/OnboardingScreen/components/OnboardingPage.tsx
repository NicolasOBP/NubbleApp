import React from 'react';

import { Box } from '@components';

export function OnboardingPage() {
  return (
    <Box flex={1}>
      <Box flex={4} bg="error" />
      <Box flex={5} bg="carrotSecondary" />
      <Box flex={1} bg="success" />
    </Box>
  );
}
