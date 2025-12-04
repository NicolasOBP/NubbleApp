import { Post, PostReactionBase } from '@domain';

const postWithoutLike: Post = {
  id: 1,
  imageURL: 'fake-url',
  commentCount: 5,
  favoriteCount: 2,
  reactionCount: 8,
  text: 'this is the text (post description)',
  author: {
    id: 2,
    name: 'Maria Julia',
    profileURL: 'https://example.com',
    userName: 'mariajulia',
  },
  reactions: [],
};

const postWithoutLikeResponse: PostReactionBase = {
  id: 4,
  emojiType: 'like',
  postId: postWithoutLike.id,
  userId: postWithoutLike.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isChecked: true,
};

export const mokcedPostWithoutLike = {
  post: postWithoutLike,
  response: postWithoutLikeResponse,
};
