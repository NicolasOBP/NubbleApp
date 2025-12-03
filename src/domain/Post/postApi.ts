import { API, PageAPI, PageParams } from '@api';
import { ImageForUpload } from '@service';

import { PostAPI } from './postTypes';

async function getList(params?: PageParams): Promise<PageAPI<PostAPI>> {
  const response = await API.get<PageAPI<PostAPI>>('/user/post', { params });

  return response.data;
}

async function createPost(
  text: string,
  imageCover: ImageForUpload,
): Promise<PostAPI> {
  const form = new FormData();

  form.append('text', text);
  form.append('imageCover', imageCover);

  const response = await API.postForm<PostAPI>('/user/post', form);

  return response.data;
}

async function getById(postId: string): Promise<PostAPI> {
  const response = await API.get<PostAPI>(`/user/post/${postId}`);

  return response.data;
}

export const postApi = {
  getList,
  createPost,
  getById,
};
