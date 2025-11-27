import { API, PageAPI, PageParams } from '@api';

import {
  PostReactionAPI,
  PostReactionBaseAPI,
  PostReactionType,
} from './PostReactionTypes';

export const POST_REACTION_PATH = 'user/reactions';

type MyReactionsParams = PageParams & {
  post_id?: number;
  reaction_type?: PostReactionType;
};
async function getMyReactions(
  myReactionsParams: MyReactionsParams,
): Promise<PageAPI<PostReactionAPI>> {
  const response = await API.get<PageAPI<PostReactionAPI>>(
    `${POST_REACTION_PATH}/my-reactions`,
    {
      params: myReactionsParams,
    },
  );

  return response.data;
}

async function createOrUpdateReaction(
  post_id: number,
  reaction_type: PostReactionType,
): Promise<PostReactionBaseAPI> {
  const path = `${POST_REACTION_PATH}/${post_id}/${reaction_type}`;
  const response = await API.post<PostReactionBaseAPI>(path);

  return response.data;
}

export const postReactionAPI = {
  getMyReactions,
  createOrUpdateReaction,
};
