import { ImageBackground, StyleSheet } from 'react-native';

import { images } from '@assets';
import { useNavigation } from '@react-navigation/native';

import { Box, BoxProps, Button, Icon, Text } from '@components';

interface Props {
  imageUri?: string;
  imageWidth: number;
}

export function Header({ imageUri, imageWidth }: Props) {
  const navigation = useNavigation();

  function navigateToPublish() {
    if (imageUri) {
      navigation.navigate('PublishPostScreen', { imageUri });
    }
  }

  function navigateToCamera() {
    navigation.navigate('CameraScreen');
  }

  return (
    <Box>
      <ImageBackground
        source={imageUri ? { uri: imageUri } : images.placeholderImage}
        style={[
          {
            width: imageWidth,
            height: imageWidth,
          },
          styles.imageBackground,
        ]}
      >
        {imageUri && (
          <Button
            onPress={navigateToPublish}
            preset="ghost"
            title="Escolher essa"
            mb="s24"
          />
        )}
      </ImageBackground>
      <Box {...$boxStyle}>
        <Text preset="headingSmall">Sua galeria</Text>
        <Icon onPress={navigateToCamera} name="camera" />
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
