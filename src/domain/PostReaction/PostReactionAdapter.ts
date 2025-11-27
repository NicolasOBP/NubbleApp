import { userAdapter } from '../User';

import {
  PostReaction,
  PostReactionAPI,
  PostReactionBase,
  PostReactionBaseAPI,
} from './PostReactionTypes';

function toPostReactionBase(
  postReactionBaseApi: PostReactionBaseAPI,
): PostReactionBase {
  return {
    id: postReactionBaseApi.id,
    emojiType: postReactionBaseApi.emoji_type,
    userId: postReactionBaseApi.user_id,
    postId: postReactionBaseApi.post_id,
    isChecked: postReactionBaseApi.is_checked,
    createdAt: postReactionBaseApi.created_at,
    updatedAt: postReactionBaseApi.updated_at,
  };
}

function toPostReaction(postReactionApi: PostReactionAPI): PostReaction {
  return {
    ...toPostReactionBase(postReactionApi),
    author: userAdapter.toUser(postReactionApi.user),
    post: {
      id: postReactionApi.post.id,
      text: postReactionApi.post.text,
      imageURL: postReactionApi.post.image_url,
    },
  };
}

export const postReactionAdapter = {
  toPostReactionBase,
  toPostReaction,
};
