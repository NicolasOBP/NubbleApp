import { API, PageAPI, PageParams } from '@api';

import { FollowerUserApi, FollowingUserApi } from './followTypes';

async function isFollowing(userId: string): Promise<{ isFollowing: boolean }> {
  const response = await API.get<{ isFollowing: boolean }>(
    `user/follow/is-following/${userId}`,
  );

  return response.data;
}

async function followUser(userId: number): Promise<FollowingUserApi> {
  const response = await API.post<FollowingUserApi>(
    'user/follow',
    {},
    { params: { followed_user_id: userId } },
  );

  return response.data;
}

async function removeFollow(followId: number): Promise<string> {
  const response = await API.delete<string>(`user/follow/${followId}`);

  return response.data;
}

async function getMyFollowingList(
  params: PageParams,
): Promise<PageAPI<FollowingUserApi>> {
  const response = await API.get<PageAPI<FollowingUserApi>>(
    'user/follow/following',
    {
      params,
    },
  );
  return response.data;
}

async function getMyFollowersList(
  params: PageParams,
): Promise<PageAPI<FollowerUserApi>> {
  const response = await API.get<PageAPI<FollowerUserApi>>(
    'user/follow/followers',
    {
      params,
    },
  );
  return response.data;
}

export const followApi = {
  isFollowing,
  followUser,
  removeFollow,
  getMyFollowingList,
  getMyFollowersList,
};
