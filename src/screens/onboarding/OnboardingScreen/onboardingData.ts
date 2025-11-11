import { ImageProps } from 'react-native';

import { images } from '@assets';

export type OnboardingPageItem = {
  title: string;
  subtitle: string;
  image: {
    light: ImageProps['source'];
    dark: ImageProps['source'];
  };
};

const page1: OnboardingPageItem = {
  title: 'Uma rede social de conexões reais',
  subtitle:
    'Fique por dentro do que acontece com as pessoas que você mais gosta',
  image: {
    dark: images.onboardingDark1,
    light: images.onboardingLight1,
  },
};

export const onboardingPages: OnboardingPageItem[] = [page1];
