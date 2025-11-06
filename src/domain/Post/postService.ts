import { apiAdapter } from '@api';
import { ImageForUpload } from '@service';
import { Page } from '@types';

import { postAdapter } from './postAdapter';
import { postApi } from './postApi';
import { Post } from './postTypes';

async function getList(page: number): Promise<Page<Post>> {
  const postPageAPI = await postApi.getList({ page, per_page: 10 });

  return apiAdapter.toPageModel(postPageAPI, postAdapter.toPost);
}

async function createPost(text: string, imageCover: ImageForUpload) {
  const postAPI = await postApi.createPost(text, imageCover);

  return postAdapter.toPost(postAPI);
}

export const postService = {
  getList,
  createPost,
};
