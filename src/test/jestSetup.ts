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
      push: jest.fn(),
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

jest.mock('expo-image-manipulator', () => ({
  manipulateAsync: jest.fn(),
}));

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockImplementation(() => Promise.resolve()),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    getToken: jest.fn(),
    getInitialNotification: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
  });
});
jest.mock('@react-native-firebase/app', () => {
  return () => ({
    getApp: jest.fn(),
  });
});

initializeStorate(inMemoryStorage);
