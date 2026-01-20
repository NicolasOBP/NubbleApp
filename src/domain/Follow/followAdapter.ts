import { userAdapter } from '../User';

import { FollowUser, FollowingUserApi } from './followTypes';
import { FollowerUserApi } from './followTypes';

function fromFollowingToUser(followingUser: FollowingUserApi): FollowUser {
  return {
    followId: followingUser.id,
    ...userAdapter.toUser(followingUser.followed),
  };
}

function fromFollowerToUser(followerUser: FollowerUserApi): FollowUser {
  return {
    followId: followerUser.id,
    ...userAdapter.toUser(followerUser.follower),
  };
}

export const followAdapter = { fromFollowingToUser, fromFollowerToUser };
