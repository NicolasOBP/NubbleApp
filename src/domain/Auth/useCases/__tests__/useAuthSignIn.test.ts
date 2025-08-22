import { AllTheProviders, renderHook, waitFor } from 'test-utils';

import { authService } from '../../authService';
import { useAuthSignIn } from '../useAuthSignIn';

import { mockedAuthCredentials } from './mockedData/mocks';

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
  });
  it('call the onError function with a message if sign-in fails', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result } = renderHook(() => useAuthSignIn(), {
      wrapper: AllTheProviders,
    });
  });
});
