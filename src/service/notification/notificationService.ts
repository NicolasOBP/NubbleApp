import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken as getTokenRN,
  getInitialNotification as getInitialNotificationRN,
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
  const notification = await getInitialNotificationRN(messaging);
  if (notification?.data) {
    return getActionFromNotificationData(notification.data);
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

export const notificationService = { getToken, getInitialNotification };
