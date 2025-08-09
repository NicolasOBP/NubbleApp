import { QueryKeys } from '@infra';
import { useQuery } from '@tanstack/react-query';

import { useDebounce } from '@hooks';

import { authService } from '../authService';

interface Param<T extends { length: number }> {
  value: T;
  enabled: boolean;
  queryKey: QueryKeys;
  isAvailableFunc: (value: T) => Promise<boolean>;
}

export function useAuthIsValueAvailable<T extends { length: number }>({
  value,
  enabled,
  isAvailableFunc,
  queryKey,
}: Param<T>) {
  const debouncedValue = useDebounce(value, 1500);

  const { data, isFetching } = useQuery({
    enabled: enabled && debouncedValue.length > 0,
    queryKey: [queryKey, debouncedValue],
    queryFn: () => isAvailableFunc(debouncedValue),
    retry: false,
    staleTime: 20000,
  });

  const isDebouncing = debouncedValue !== value;

  return {
    isUnavailable: data === false,
    isFetching: isDebouncing || isFetching,
  };
}

export function useAuthIsUsernameAvailable({
  username,
  enabled,
}: {
  username: string;
  enabled: boolean;
}) {
  return useAuthIsValueAvailable({
    value: username,
    enabled,
    isAvailableFunc: authService.isUserNameAvailable,
    queryKey: QueryKeys.IsUsernameAvailable,
  });
}
export function useAuthIsEmailAvailable({
  email,
  enabled,
}: {
  email: string;
  enabled: boolean;
}) {
  return useAuthIsValueAvailable({
    value: email,
    enabled,
    isAvailableFunc: authService.isEmailAvailable,
    queryKey: QueryKeys.IsUsernameAvailable,
  });
}
