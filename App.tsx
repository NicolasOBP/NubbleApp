// import {
//   AuthCredentialsProvider,
//   initializeStorate,
//   MMKVStorage,
// } from '@service';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Toast } from '@components';
import { useAppColorScheme } from '@hooks';

import { Routes } from './src/routes/Routes';
import { AuthCredentialsProvider } from './src/service/authCredentials';
import { initializeStorate, MMKVStorage } from './src/service/storage';
import { darkTheme, theme } from './src/theme/theme';

const queryClient = new QueryClient();

initializeStorate(MMKVStorage);

async function requestPermission() {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  } else {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
}

function App() {
  const appColor = useAppColorScheme();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={appColor === 'dark' ? darkTheme : theme}>
            {/* Only use ToastProvider if it is using Context implementation.
        Zustand implementation doesn't need a provider */}
            {/* <ToastProvider> */}
            <Routes />
            <Toast />
            {/* </ToastProvider> */}
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
