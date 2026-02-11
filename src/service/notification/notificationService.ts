import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken as getTokenRN,
} from '@react-native-firebase/messaging';

async function getToken() {
  const app = getApp();
  const messaging = getMessaging(app);
  const token = await getTokenRN(messaging);

  return token;
}

export const notificationService = { getToken };
