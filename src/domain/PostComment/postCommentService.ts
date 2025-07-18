import { apiAdapter } from '@api';
import { Page } from '@types';

import { postCommentAdapter } from './postCommentAdapter';
import { postCommentApi } from './postCommentAPI';
import { PostComment } from './postCommentTypes';

const PER_PAGE = 10;
async function getList(
  postId: number,
  page: number,
): Promise<Page<PostComment>> {
  const postCommentPageAPI = await postCommentApi.getList(postId, {
    page,
    per_page: PER_PAGE,
  });

  return {
    data: postCommentPageAPI.data.map(postCommentAdapter.toPostComment),
    meta: apiAdapter.toMetaDataPage(postCommentPageAPI.meta),
  };
}

async function create(postId: number, message: string): Promise<PostComment> {
  const postCommentAPI = await postCommentApi.create(postId, message);

  return postCommentAdapter.toPostComment(postCommentAPI);
}

async function remove(postCommentId: number): Promise<string> {
  const response = await postCommentApi.remove(postCommentId);

  return response.message;
}

/**
 * @description user can delete the comment if it is the user's own comment or post
 * @param userId the current session user ID
 * @param postComment comment to be deleted
 * @param postAuthorId the author ID of the post
 */
function isAllowedToRemove(
  postComment: PostComment,
  userId: number,
  postAuthorId: number,
): boolean {
  if (postComment.author.id === userId) return true;

  if (postAuthorId === userId) return true;

  return false;
}

export const postCommentService = {
  getList,
  create,
  remove,
  isAllowedToRemove,
};
