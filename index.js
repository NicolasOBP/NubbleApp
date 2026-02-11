/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { name as appName } from './app.json';

const messaging = getMessaging(getApp());
setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('Background message handled!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
