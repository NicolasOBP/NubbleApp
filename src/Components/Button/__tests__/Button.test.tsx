import React from 'react';
import { StyleSheet } from 'react-native';

import { fireEvent, render, screen } from 'test-utils';

import { theme } from '@theme';

import { Button, ButtonProps } from '../Button';

function renderComponent(props?: Partial<ButtonProps>) {
  render(<Button title="Button Title" {...props} />);

  const titleElement = screen.queryByText('button title', { exact: false });
  const buttonElement = screen.getByTestId('button', { exact: false });
  const loadingElement = screen.queryByTestId('activity-indicator', {
    exact: false,
  });

  return {
    titleElement,
    loadingElement,
    buttonElement,
  };
}

describe('<Button />', () => {
  it('calls the onPress function when it is pressed', () => {
    const mockedOnPress = jest.fn();
    const { titleElement, loadingElement } = renderComponent({
      onPress: mockedOnPress,
    });

    fireEvent.press(titleElement!);

    expect(mockedOnPress).toHaveBeenCalled();
    expect(loadingElement).toBeFalsy();
  });
  it('does not call onPress function when it is disabled and pressed', () => {
    const mockedOnPress = jest.fn();
    const { titleElement } = renderComponent({
      onPress: mockedOnPress,
      disabled: true,
    });

    fireEvent.press(titleElement!);
    expect(mockedOnPress).not.toHaveBeenCalled();
  });
  test('the title should be gray if button is disabled', () => {
    const { titleElement } = renderComponent({ disabled: true });

    const titleStyle = StyleSheet.flatten(titleElement?.props.style);

    expect(titleStyle.color).toEqual(theme.colors.gray2);
  });

  describe('when button is loading', () => {
    it('shows activity indicator', () => {
      const { loadingElement } = renderComponent({ loading: true });

      expect(loadingElement).toBeTruthy();
    });
    it('hides button title', () => {
      const { titleElement } = renderComponent({ loading: true });

      expect(titleElement).toBeFalsy();
    });
    it('disables onPress function', () => {
      const mockedOnPress = jest.fn();
      const { buttonElement } = renderComponent({
        loading: true,
        onPress: mockedOnPress,
      });

      fireEvent.press(buttonElement);

      expect(mockedOnPress).not.toHaveBeenCalled();
    });
  });
});
