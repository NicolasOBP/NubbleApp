import { PostReaction, PostReactionAPI } from '../PostReaction';
import { UserAPI } from '../User';

export interface Post {
  id: number;
  text: string;
  author: {
    profileURL: string;
    name: string;
    userName: string;
    id: number;
  };
  imageURL: string;
  reactionCount: number;
  commentCount: number;
  favoriteCount: number;
  reactions: Pick<PostReaction, 'emojiType' | 'postId'>[];
}

export interface PostAPI {
  created_at: string; // '2025-07-03T18:36:01.856-03:00';
  id: number; // 1;
  image_url: string; //'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/post1.jpg';
  is_activated: true;
  is_fixed: boolean; // false;
  status: string; //'published';
  text: string; //'Bom dia!';
  updated_at: string; //'2025-07-03T18:36:01.863-03:00';
  user: UserAPI;
  user_id: number; //1;
  meta: {
    like_count: string; // '5';
    favorite_count: string; // '1';
    comments_count: string; // '4';
  };
  reactions: Pick<PostReactionAPI, 'emoji_type' | 'post_id'>[];
}
