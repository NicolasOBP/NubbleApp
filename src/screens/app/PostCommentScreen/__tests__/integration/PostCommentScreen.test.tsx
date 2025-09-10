import { act } from 'react';
import { Alert, AlertButton } from 'react-native';

import { authCredentialsStorage } from '@service';
import { server, mockedPostComment, resetInMemoryResponse } from '@test';
import {
  fireEvent,
  renderScreen,
  screen,
  waitForElementToBeRemoved,
} from 'test-utils';

import { PostCommentScreen } from '../../PostCommentScreen';

beforeAll(() => {
  jest.useFakeTimers();
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  resetInMemoryResponse();
});

afterAll(() => {
  server.close();
  jest.resetAllMocks();
  jest.useRealTimers();
});

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

  test('when deleting a comment, the is automatically updated and a toast messageg is displayed', async () => {
    jest
      .spyOn(authCredentialsStorage, 'get')
      .mockResolvedValue(mockedPostComment.mateusAuthCredentials);

    let mockedConfirm: AlertButton['onPress'];

    const mockedAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, buttons) => {
        if (buttons && buttons[0]) {
          mockedConfirm = buttons[0].onPress;
        }
      });

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
    const comment = await screen.findByText(
      mockedPostComment.mateusPostCommentAPI.message,
      { exact: false },
    );

    expect(comment).toBeTruthy();

    // long press in the comment
    fireEvent(comment, 'longPress');

    expect(mockedAlert).toHaveBeenCalled();
    // press 'confirmar' in the alert
    mockedConfirm && mockedConfirm();

    // check if the list was updated (the comment is gone)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(mockedPostComment.mateusPostCommentAPI.message, {
        exact: false,
      }),
    );

    const comments = await screen.findAllByTestId('post-comment-id');

    expect(comments.length).toBe(1);

    // check if toast message appeared
    await screen.findByTestId('toast-message');

    act(() => jest.runAllTimers());

    expect(screen.queryByTestId('toast-message')).toBeNull();
  });
});
