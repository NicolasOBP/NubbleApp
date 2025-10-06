import { Linking } from 'react-native';

import { PermissionName, usePermission } from '@service';

import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { Button } from '../Button/Button';
import { Screen } from '../Screen/Screen';
import { Text } from '../Text/Text';

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
    <Screen flex={1} justifyContent="center" alignItems="center">
      <Text preset="headingSmall" textAlign="center" color="error">
        {description}
      </Text>
      {isLoading && <ActivityIndicator color="primary" />}
      {status === 'never_ask_again' && (
        <Button
          mt="s16"
          title="Abrir configurações"
          onPress={Linking.openSettings}
        />
      )}
    </Screen>
  );
}
