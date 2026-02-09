import { apiAdapter } from '@api';
import { Page } from '@types';

import { userAdapter } from './userAdapter';
import { userApi } from './userApi';
import { UpdateUserParams, User, UserDetails } from './userTypes';

async function getById(id: number): Promise<UserDetails> {
  const userAPI = await userApi.getById(id.toString());
  const { isFollowing } = await userApi.isFollowing(id.toString());

  return userAdapter.toUserDetails(userAPI, isFollowing);
}

async function searchUser(search: string): Promise<Page<User>> {
  const userPageAPI = await userApi.getList(search);

  return apiAdapter.toPageModel(userPageAPI, userAdapter.toUser);
}

async function updateUser(
  current: User,
  updateParams: UpdateUserParams,
): Promise<User> {
  const updatedUser = getUpdatedUser(current, updateParams);
  const userAPI = await userApi.updateUser(updatedUser);

  return userAdapter.toUser(userAPI);
}

function getUpdatedUser(
  current: User,
  updateParams: UpdateUserParams,
): UpdateUserParams {
  const updatedUser: UpdateUserParams = {};

  if (
    !!updateParams.firstName &&
    current.firstName !== updateParams.firstName
  ) {
    updatedUser.firstName = updateParams.firstName;
  }

  if (!!updateParams.lastName && current.lastName !== updateParams.lastName) {
    updatedUser.lastName = updateParams.lastName;
  }

  if (!!updateParams.username && current.username !== updateParams.username) {
    updatedUser.username = updateParams.username;
  }

  return updatedUser;
}

async function addNotificationToken(token: string): Promise<string> {
  return userApi.addNotificationToken(token);
}

async function deleteNotificationToken(): Promise<string> {
  return userApi.deleteNotificationToken();
}

export const userService = {
  getById,
  searchUser,
  updateUser,
  addNotificationToken,
  deleteNotificationToken,
};
