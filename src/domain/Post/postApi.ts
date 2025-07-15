import { API, PageAPI, PageParams } from '@api';

import { PostAPI } from './postTypes';

async function getList(params?: PageParams): Promise<PageAPI<PostAPI>> {
  const response = await API.get<PageAPI<PostAPI>>('/user/post', { params });

  return response.data;
}

export const postApi = {
  getList,
};
