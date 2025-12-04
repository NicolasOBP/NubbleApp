import { useState } from 'react';

import { MutationOptions, QueryKeys } from '@infra';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from 'src/domain/Post/postTypes';

import { postReactionService } from '../PostReactionService';
import { PostReactionBase, PostReactionType } from '../PostReactionTypes';

type Params = {
  post: Post;
  postReactionType: PostReactionType;
  queryKeys?: QueryKeys[];
  options?: MutationOptions<PostReactionBase>;
};

export function useReactToPost({
  post,
  postReactionType,
  queryKeys,
  options,
}: Params) {
  const queryClient = useQueryClient();

  const initialHasReacted = postReactionService.hasReactedToPost(
    post.reactions,
    postReactionType,
  );

  const initialReactionCount =
    postReactionType === 'like' ? post.reactionCount : post.favoriteCount;

  const [reactionState, setReactionState] = useState({
    hasReacted: initialHasReacted,
    reactionCount: initialReactionCount,
  });

  const { mutate } = useMutation<PostReactionBase, Error>({
    mutationFn: () =>
      postReactionService.reactToPost(post.id, postReactionType),
    onSuccess: () => {
      if (queryKeys) {
        queryKeys.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }

      toggleReactionState();
    },
  });

  function reactToPost() {
    toggleReactionState();
    mutate();
  }

  function toggleReactionState() {
    setReactionState(prev => ({
      hasReacted: !prev.hasReacted,
      reactionCount: prev.hasReacted
        ? prev.reactionCount - 1
        : prev.reactionCount + 1,
    }));
  }

  return {
    hasReacted: reactionState.hasReacted,
    reactionCount: reactionState.reactionCount,
    reactToPost,
  };
}
