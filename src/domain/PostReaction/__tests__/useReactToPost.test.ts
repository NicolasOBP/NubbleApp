import { act, renderHook, waitFor } from 'test-utils';

import { postReactionService } from '../PostReactionService';
import { useReactToPost } from '../useCases/useReactToPost';

import { mokcedPostWithoutLike } from './mockedData/mockedPost';

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
});
