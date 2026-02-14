import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken as getTokenRN,
  getInitialNotification as getInitialNotificationRN,
  onNotificationOpenedApp as onNotificationOpenedAppRN,
} from '@react-native-firebase/messaging';

import { NotificationToNavigate } from './notificationTypes';

async function getToken() {
  const app = getApp();
  const messaging = getMessaging(app);
  const token = await getTokenRN(messaging);

  return token;
}

async function getInitialNotification(): Promise<NotificationToNavigate | null> {
  const app = getApp();
  const messaging = getMessaging(app);
  const remoteMessage = await getInitialNotificationRN(messaging);
  if (remoteMessage?.data) {
    return getActionFromNotificationData(remoteMessage.data);
  }
  return null;
}

function getActionFromNotificationData(data: {
  [key: string]: string | object;
}): NotificationToNavigate | null {
  if (typeof data.navigate === 'string') {
    const navigateProps = JSON.parse(data.navigate);
    if (typeof navigateProps.screen === 'string') {
      const screen = navigateProps.screen;
      const params = navigateProps.params || undefined;

      return { screen, params };
    }
  }

  return null;
}

function onNotificationOpenedApp(
  listener: (action: NotificationToNavigate | null) => void,
): () => void {
  const app = getApp();
  const messaging = getMessaging(app);
  const unsubscribe = onNotificationOpenedAppRN(messaging, remoteMessage => {
    if (remoteMessage.data) {
      const action = getActionFromNotificationData(remoteMessage.data);
      listener(action);
    }
  });

  return unsubscribe;
}

export const notificationService = {
  getToken,
  getInitialNotification,
  onNotificationOpenedApp,
};
