import { render, screen } from 'test-utils';

import { PasswordInput } from '../PasswordInput';

describe('<PasswordInput />', () => {
  const mockedOnChange = jest.fn();
  it('it starts with hidden password', () => {
    render(
      <PasswordInput
        label="Password"
        placeholder="password"
        value="123456"
        onChangeText={mockedOnChange}
      />,
    );

    const inputElement = screen.getByPlaceholderText('password');

    expect(inputElement.props.secureTextEntry).toBeTruthy();
  });
});
