import { API, PageAPI } from '@api';

import { PostAPI } from './postTypes';

async function getList(): Promise<PageAPI<PostAPI>> {
  const response = await API.get<PageAPI<PostAPI>>('/user/post');

  await new Promise(resolve => setTimeout(() => resolve(''), 2000));

  return response.data;
}

export const postApi = {
  getList,
};
