import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';

import { Box, BoxProps, Icon, PermissionManager } from '@components';
import { useAppSafeArea, useAppState } from '@hooks';
import { AppScreenProps } from '@routes';

const CAMERA_VIEW = Dimensions.get('window').width;
const CONTROL_HEIGHT = (Dimensions.get('window').height - CAMERA_VIEW) / 2;
const CONTROL_DIFF = 30;

export function CameraScreen({ navigation }: AppScreenProps<'CameraScreen'>) {
  const { top } = useAppSafeArea();
  const [flashOn, setFlashOn] = useState(false);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const format = useCameraFormat(device, Templates.Instagram);

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  function toggleFlash() {
    setFlashOn(prev => !prev);
  }

  return (
    <PermissionManager
      permissionName="camera"
      description="Permita o Nubble acessar a câmera do dispositivo"
    >
      <Box flex={1}>
        {device && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            format={format}
          />
        )}

        <Box flex={1} justifyContent="space-between">
          <Box {...$controlAreaTop} style={{ paddingTop: top }}>
            <Icon
              size={20}
              color="grayWhite"
              name="arrowLeft"
              onPress={navigation.goBack}
            />
            <Icon
              size={20}
              color="grayWhite"
              name={flashOn ? 'flashOn' : 'flashOff'}
              onPress={toggleFlash}
            />
            <Box width={20} />
          </Box>

          <Box {...$controlAreaBottom}>
            <Icon size={80} name="cameraClick" color="grayWhite" />
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  );
}
const $controlAreaTop: BoxProps = {
  backgroundColor: 'black60',
  height: CONTROL_HEIGHT - CONTROL_DIFF,
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingHorizontal: 's24',
};
const $controlAreaBottom: BoxProps = {
  backgroundColor: 'black60',
  height: CONTROL_HEIGHT + CONTROL_DIFF,
  justifyContent: 'center',
  alignItems: 'center',
};
