import { Linking, Platform } from 'react-native';

import { PermissionName, usePermission } from '@service';

import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Screen } from '../Screen/Screen';
import { Text, TextProps } from '../Text/Text';

interface PermissionManagerProps {
  permissionName: PermissionName;
  description: string;
  children: React.ReactElement;
}

export function PermissionManager({
  children,
  description,
  permissionName,
}: PermissionManagerProps) {
  const { status, isLoading } = usePermission(permissionName);

  if (status === 'granted') {
    return children;
  }

  return (
    <Screen canGoBack flex={1}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text preset="headingSmall" textAlign="center">
          {description}
        </Text>
        {isLoading && <ActivityIndicator color="primary" />}
        {status === 'unavailable' && (
          <Text {...$messageStyle}>
            Esse recurso não está disponível nesse dispositivo
          </Text>
        )}
        {status === 'never_ask_again' && (
          <Box>
            {Platform.OS === 'android' && (
              <Text {...$messageStyle}>
                É necessário abrir e fechar o App novamente após alterar as
                configurações
              </Text>
            )}
            <Button
              mt="s16"
              title="Abrir configurações"
              onPress={Linking.openSettings}
            />
          </Box>
        )}
      </Box>
    </Screen>
  );
}

const $messageStyle: TextProps = {
  preset: 'paragraphMedium',
  color: 'error',
  bold: true,
  marginVertical: 's16',
  textAlign: 'center',
};
