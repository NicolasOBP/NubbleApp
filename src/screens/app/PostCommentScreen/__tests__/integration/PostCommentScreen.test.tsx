import { authCredentialsStorage } from '@service';
import { server, mockedPostComment } from '@test';
import { fireEvent, renderScreen, screen } from 'test-utils';

import { PostCommentScreen } from '../../PostCommentScreen';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('integration: PostCommentScreen', () => {
  test('when adding a comment the list is automatically updated', async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postAuthorId: 1,
            postId: 1,
          },
        }}
      />,
    );

    const comment = await screen.findByText(/comentário aleatório/i);

    expect(comment).toBeTruthy();

    // find input text field
    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i);

    // write down a message
    fireEvent.changeText(inputText, 'novo comentário');

    // press send event
    fireEvent.press(screen.getByText(/Enviar/i));

    // expect: list updated successfully
    const newComment = await screen.findByText(/novo comentário/i);

    expect(newComment).toBeTruthy();

    const comments = await screen.findAllByTestId('post-comment-id');

    expect(comments.length).toBe(3);
  });

  test('when deleting a comment, the is automatically updated and a toast messageg is displayed', () => {
    jest
      .spyOn(authCredentialsStorage, 'get')
      .mockResolvedValue(mockedPostComment.mateusAuthCredentials);

    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postAuthorId: 1,
            postId: 1,
          },
        }}
      />,
    );

    // wait the list to load

    // find the comment to be deleted

    // long press in the comment

    // press 'confirmar' in the alert

    // check if the list was updated (deleted comment)

    // check if toast message apeared
  });
});
