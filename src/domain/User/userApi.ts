import { API, PageAPI } from '@api';

import { UserAPI } from './userTypes';

export const USER_PATH = 'users';

async function getById(userId: string): Promise<UserAPI> {
  const response = await API.get<UserAPI>(`${USER_PATH}/${userId}`);

  return response.data;
}

async function getList(search: string): Promise<PageAPI<UserAPI>> {
  const response = await API.get<PageAPI<UserAPI>>(`${USER_PATH}`, {
    params: { search },
  });

  return response.data;
}

//TODO: move to follow domaain when it is ready
async function isFollowing(userId: string): Promise<{ isFollowing: boolean }> {
  const response = await API.get<{ isFollowing: boolean }>(
    `user/follow/is-following/${userId}`,
  );

  return response.data;
}

export const userApi = {
  getById,
  getList,
  isFollowing,
};
