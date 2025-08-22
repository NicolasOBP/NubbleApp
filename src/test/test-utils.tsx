import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react-native';

import { theme } from '@theme';

export const wrapperAllProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false, gcTime: Infinity },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

function customRender<T = unknown>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, { wrapper: wrapperAllProviders(), ...options });
}

function customRenderHook<Result, Props>(
  hookToRender: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook(hookToRender, {
    wrapper: wrapperAllProviders(),
    ...options,
  });
}

export * from '@testing-library/react-native';
export { customRender as render };
export { customRenderHook as renderHook };
