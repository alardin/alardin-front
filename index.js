import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import Root from './src/Root';
import notificationHandle from './src/utils/notificationHandle';
import './src/utils/initalNotification';
import StoreNotification from './src/recoil/notify/storageNotify';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  notificationHandle(remoteMessage);
  StoreNotification(remoteMessage);
  console.log(
    `message handled in the background ${JSON.stringify(remoteMessage)}`,
  );
});

AppRegistry.registerComponent(appName, () => Root);
