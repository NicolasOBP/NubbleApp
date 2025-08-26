import { setupServer } from 'msw/native';

import { postCommentHandlers } from './PostComment/PostCommentHandlers';

export const server = setupServer(...postCommentHandlers);
