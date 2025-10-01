//@ts-ignore
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

import { initializeStorate } from '../service/storage/';
import { inMemoryStorage } from '../service/storage/implementation/jest/inMemoryStorage';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

initializeStorate(inMemoryStorage);
