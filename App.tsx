// import {
//   AuthCredentialsProvider,
//   initializeStorate,
//   MMKVStorage,
// } from '@service';
import { useAppColor } from '@service';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Toast } from '@components';

import { Routes } from './src/routes/Routes';
import { AuthCredentialsProvider } from './src/service/authCredentials';
import { initializeStorate, MMKVStorage } from './src/service/storage';
import { darkTheme, theme } from './src/theme/theme';

const queryClient = new QueryClient();

initializeStorate(MMKVStorage);

function App() {
  const appColor = useAppColor();
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
