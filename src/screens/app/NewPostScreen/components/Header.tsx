import { ImageBackground, StyleSheet } from 'react-native';

import { Box, BoxProps, Button, Icon, Text } from '@components';

interface Props {
  imageUri: string;
  imageWidth: number;
}

export function Header({ imageUri, imageWidth }: Props) {
  return (
    <Box>
      <ImageBackground
        src={imageUri}
        style={[
          {
            width: imageWidth,
            height: imageWidth,
          },
          styles.imageBackground,
        ]}
      >
        <Button title="Escolher essa" mb="s24" />
      </ImageBackground>
      <Box {...$boxStyle}>
        <Text preset="headingSmall">Sua galeria</Text>
        <Icon name="camera" />
      </Box>
    </Box>
  );
}

const $boxStyle: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 's24',
  alignItems: 'center',
  paddingVertical: 's16',
};

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
