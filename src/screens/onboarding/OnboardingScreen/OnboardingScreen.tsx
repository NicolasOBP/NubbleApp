import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { useSettingsService } from '@service';

import { Box } from '@components';
import { OnboardingScreenProps } from '@routes';

import { OnboardingPage } from './components/OnboardingPage';
import { OnboardingPageItem, onboardingPages } from './onboardingData';

export function OnboardingScreen({}: OnboardingScreenProps<'OnboardingScreen'>) {
  const [pageIndex, setPageIndex] = useState(0);
  const { finishOnboarding } = useSettingsService();

  const flatListRef = useRef<FlatList<OnboardingPageItem>>(null);

  function onPressNext() {
    const isLastPage = pageIndex === onboardingPages.length - 1;

    if (isLastPage) {
      finishOnboarding();
    } else {
      const nextIndex = pageIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setPageIndex(nextIndex);
    }
  }

  function renderItem({ item }: ListRenderItemInfo<OnboardingPageItem>) {
    return (
      <OnboardingPage
        pageItem={item}
        onPressNext={onPressNext}
        onPressSkip={finishOnboarding}
      />
    );
  }

  return (
    <Box flex={1} bg="background">
      <FlatList
        ref={flatListRef}
        scrollEnabled={false}
        horizontal
        data={onboardingPages}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
}
