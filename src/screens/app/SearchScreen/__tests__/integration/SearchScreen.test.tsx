import { authCredentialsStorage } from '@service';
import { mockUtils, server, userMocked } from '@test';
import { fireEvent, renderScreen, screen } from 'test-utils';

import { AppStack } from '@routes';

beforeAll(() => {
  server.listen();
  jest
    .spyOn(authCredentialsStorage, 'get')
    .mockResolvedValue(mockUtils.mateusAuthCredentials);
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  jest.resetAllMocks();
});

describe('integration: SearchScreen', () => {
  test('Search Flow', async () => {
    renderScreen(<AppStack initialRouteName="SearchScreen" />);

    const inputText = screen.getByPlaceholderText(/digite sua busca/i);

    fireEvent.changeText(inputText, 'mar');

    const flatList = await screen.findByTestId('test');
    expect(flatList).toBeTruthy();

    const user1 = await screen.findByText(userMocked.user1.username);
    expect(user1).toBeTruthy();

    const user2 = await screen.findByText(userMocked.user2.username);
    expect(user2).toBeTruthy();

    fireEvent.press(user1);
  });
});
