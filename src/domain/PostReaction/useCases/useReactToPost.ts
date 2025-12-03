import { Post } from 'src/domain/Post/postTypes';

import { postReactionService } from '../PostReactionService';
import { PostReactionType } from '../PostReactionTypes';

type Params = {
  post: Post;
  postReactionType: PostReactionType;
};

export function useReactToPost({ post, postReactionType }: Params) {
  const hasReacted = postReactionService.hasReactedToPost(
    post.reactions,
    postReactionType,
  );

  return { hasReacted };
}
