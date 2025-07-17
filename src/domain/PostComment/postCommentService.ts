import { apiAdapter } from '@api';
import { Page } from '@types';

import { postCommentAdapter } from './postCommentAdapter';
import { postCommentApi } from './postCommentAPI';
import { PostComment } from './postCommentTypes';

const PER_PAGE = 10;
async function getList(
  postID: number,
  page: number,
): Promise<Page<PostComment>> {
  const postCommentPageAPI = await postCommentApi.getList(postID, {
    page,
    per_page: PER_PAGE,
  });

  return {
    data: postCommentPageAPI.data.map(postCommentAdapter.toPostComment),
    meta: apiAdapter.toMetaDataPage(postCommentPageAPI.meta),
  };
}

export const postCommentService = {
  getList,
};
