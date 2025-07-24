import { User, UserAPI } from './userTypes';

/**
 * @description Adapta o UserAPI para o modelo de User
 */
export function toUser(userApi: UserAPI): User {
  return {
    email: userApi.email,
    firstName: userApi.first_name,
    fullName: userApi.full_name,
    id: userApi.id,
    isOnline: userApi.is_online,
    lastName: userApi.last_name,
    profileUrl: userApi.profile_url,
    username: userApi.username,
  };
}

export const userAdapter = {
  toUser,
};
