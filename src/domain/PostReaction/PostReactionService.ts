import { apiAdapter } from '@api';
import { Page } from '@types';

import { postReactionAdapter } from './PostReactionAdapter';
import { postReactionAPI } from './PostReactionAPI';
import {
  PostReaction,
  PostReactionBase,
  PostReactionType,
} from './PostReactionTypes';

const PER_PAGE = 10;

async function getMyReactions(
  page: number,
  reactionType: PostReactionType,
): Promise<Page<PostReaction>> {
  const postReactionPageApi = await postReactionAPI.getMyReactions({
    page,
    per_page: PER_PAGE,
    reaction_type: reactionType,
  });

  return apiAdapter.toPageModel(
    postReactionPageApi,
    postReactionAdapter.toPostReaction,
  );
}

async function reactToPost(
  postId: number,
  reactionType: PostReactionType,
): Promise<PostReactionBase> {
  const postReaction = await postReactionAPI.createOrUpdateReaction(
    postId,
    reactionType,
  );

  return postReactionAdapter.toPostReactionBase(postReaction);
}

export const postReactionService = {
  getMyReactions,
  reactToPost,
};
