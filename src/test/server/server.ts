import { setupServer } from 'msw/native';

import { postCommentHandlers } from './PostComment/PostCommentHandlers';

export const server = setupServer(...postCommentHandlers);

export { mockedData as mockedPostComment } from './PostComment/mocks';
