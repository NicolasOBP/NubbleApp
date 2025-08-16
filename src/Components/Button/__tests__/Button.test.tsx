import React from 'react';

import { fireEvent, render, screen } from 'test-utils';

import { Button } from '../Button';

describe('<Button />', () => {
  it('calls the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn();

    render(<Button title="Button Title" onPress={mockedOnPress} />);

    const titleElement = screen.getByText('button title', { exact: false });

    fireEvent.press(titleElement);

    expect(mockedOnPress).toHaveBeenCalled();
  });
});
