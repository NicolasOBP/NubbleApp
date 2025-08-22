import { AllTheProviders, renderHook, waitFor } from 'test-utils';

import { authService } from '../../authService';
import { useAuthSignIn } from '../useAuthSignIn';

import { mockedAuthCredentials } from './mockedData/mocks';

const mockedSaveCredentials = jest.fn();

jest.mock('@service', () => {
  const originalModule = jest.requireActual('@service');

  return {
    ...originalModule,
    useAuthCredentials: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  };
});

describe('useAuthSignIn', () => {
  it('saves credentials if the sign-in successfully', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials);

    const { result } = renderHook(() => useAuthSignIn(), {
      wrapper: AllTheProviders,
    });

    result.current.signIn({ email: '123@123.com', password: '123' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
  });
  it('call the onError function with a message if sign-in fails', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result } = renderHook(() => useAuthSignIn(), {
      wrapper: AllTheProviders,
    });
  });
});
