export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileUrl: string;
  isOnline: boolean;
  fullName: string;
  meta: {
    followersCount: string;
    followingCount: string;
  };
}

export interface UserDetails extends User {
  isFollowing: boolean;
}

export interface UserAPI {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_url: string;
  is_online: boolean;
  full_name: string;
  meta: {
    followers_count: string;
    following_count: string;
  };
}

export type UpdateUserParams = Partial<
  Pick<User, 'firstName' | 'lastName' | 'username'>
>;
