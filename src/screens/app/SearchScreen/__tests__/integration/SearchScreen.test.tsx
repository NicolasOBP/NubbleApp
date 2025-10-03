import { authCredentialsStorage } from '@service';
import { mockUtils, server, userMocked } from '@test';
import { act, fireEvent, renderScreen, screen } from 'test-utils';

import { AppStack } from '@routes';

jest.unmock('@react-navigation/native');

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
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
  jest.useRealTimers();
});

describe('integration: SearchScreen', () => {
  test('Search Flow', async () => {
    // 1) Navigate to Search Screen
    renderScreen(<AppStack initialRouteName="SearchScreen" />);

    // 2) Find the Search Input and type username
    const inputText = screen.getByPlaceholderText(/digite sua busca/i);
    fireEvent.changeText(inputText, 'mar');
    act(() => jest.runAllTimers());

    // 3) Find two users as per the MSW mock
    const flatList = await screen.findByTestId('test');
    expect(flatList).toBeTruthy();

    const user1 = await screen.findByText(userMocked.user1.username);
    expect(user1).toBeTruthy();

    const user2 = await screen.findByText(userMocked.user2.username);
    expect(user2).toBeTruthy();

    // 4) Select ueser1 and Navigate to Profile Screen
    fireEvent.press(user1);

    // 5) Expect to be at the Profile Screen with the ueser1 loaded
    const userFullName = await screen.findByText(userMocked.user1.full_name);
    expect(userFullName).toBeTruthy();

    // 6) Press the back button to navigate back to Search Screen
    const backButton = screen.getByTestId('screen-back-button');
    fireEvent.press(backButton);

    // 7) Clean the search input
    const inputTextAfterBack = screen.getByPlaceholderText(/digite sua busca/i);
    fireEvent.changeText(inputTextAfterBack, '');
    act(() => jest.runAllTimers());

    // 8) Make sure the search history section appears
    const searchHistoryTitle = screen.getByText(/buscas recentes/i);
    expect(searchHistoryTitle).toBeTruthy();

    // 9) The user1 (pressed) was saved in the search history
    const user1AfterBack = screen.queryByText(userMocked.user1.username);
    expect(user1AfterBack).toBeTruthy();

    // 10) The user2 (NOT PRESSED) must NOT appear in the search history
    const user2AfterBack = screen.queryByText(userMocked.user2.username);
    expect(user2AfterBack).toBeFalsy();

    // 11) Remove user1 from the searc history by pressing trash icon
    const trashIcon = screen.getByTestId('trash');
    fireEvent.press(trashIcon);

    // 12) Make sure user1 was removed from the search history
    const user1AfterRemoved = screen.queryByText(userMocked.user1.username);
    expect(user1AfterRemoved).toBeFalsy();
  });
});
