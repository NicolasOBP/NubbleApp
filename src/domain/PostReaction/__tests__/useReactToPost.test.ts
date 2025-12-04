import { act, renderHook, waitFor } from 'test-utils';

import { postReactionService } from '../PostReactionService';
import { useReactToPost } from '../useCases/useReactToPost';

import {
  mokcedPostWithLike,
  mokcedPostWithoutLike,
} from './mockedData/mockedPost';

describe('useReactToPost', () => {
  test('when react to post, hasReacted and reactionCount should be updated', async () => {
    jest
      .spyOn(postReactionService, 'reactToPost')
      .mockResolvedValueOnce(mokcedPostWithoutLike.response);

    const { result } = renderHook(() =>
      useReactToPost({
        post: mokcedPostWithoutLike.post,
        postReactionType: 'like',
      }),
    );

    expect(result.current.hasReacted).toBeFalsy();
    expect(result.current.reactionCount).toBe(
      mokcedPostWithoutLike.post.reactionCount,
    );

    act(() => {
      result.current.reactToPost();
    });

    await waitFor(() => expect(result.current.hasReacted).toBeTruthy());
    await waitFor(() =>
      expect(result.current.reactionCount).toBe(
        mokcedPostWithoutLike.post.reactionCount + 1,
      ),
    );
  });

  test('when react to post fails, hasReacted and reactionCount should be reverted to the originals values', async () => {
    const errorMessage = 'API error';

    jest
      .spyOn(postReactionService, 'reactToPost')
      .mockRejectedValueOnce(new Error(errorMessage));

    const mockedOnError = jest.fn();

    const { result } = renderHook(() =>
      useReactToPost({
        post: mokcedPostWithLike.post,
        postReactionType: 'like',
        options: { onError: mockedOnError },
      }),
    );

    expect(result.current.hasReacted).toBeTruthy();
    expect(result.current.reactionCount).toBe(
      mokcedPostWithLike.post.reactionCount,
    );

    act(() => {
      result.current.reactToPost();
    });

    await waitFor(() => expect(result.current.hasReacted).toBeTruthy());
    await waitFor(() =>
      expect(result.current.reactionCount).toBe(
        mokcedPostWithLike.post.reactionCount,
      ),
    );

    expect(mockedOnError).toHaveBeenCalledWith(errorMessage);
  });
});
