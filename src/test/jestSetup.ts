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

jest.mock('@react-native-camera-roll/camera-roll', () => {
  return {
    CameraRoll: {
      getPhotos: jest.fn(async () => ({
        edges: [
          { node: { image: { uri: 'photo1' } } },
          { node: { image: { uri: 'photo2' } } },
          { node: { image: { uri: 'photo3' } } },
        ],
      })),
    },
  };
});

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('../service/permission/permissionService', () => ({
  permissionService: {
    request: jest.fn(),
    check: jest.fn(),
  },
}));

initializeStorate(inMemoryStorage);
