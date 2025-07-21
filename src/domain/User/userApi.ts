import { API } from '@api';

import { UserAPI } from './userTypes';

const PATH = 'users';

async function getById(userId: string): Promise<UserAPI> {
  const response = await API.get<UserAPI>(`${PATH}/${userId}`);

  return response.data;
}

export const userApi = {
  getById,
};
