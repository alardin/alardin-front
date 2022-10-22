import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import Root from './src/Root';
import StoreNotification from './src/recoil/notify/storageNotify';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import notificationHandle from './src/utils/notification/notificationHandle';

PushNotification.configure({
  onRegister: register => {
    console.log(`register: ` + JSON.stringify(register));
  },
  onNotification: async notify => {
    console.log(`notification: ` + JSON.stringify(notify));
    notificationHandle({
      data: notify.data,
    });
    notify.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: notify => {
    console.log(`action: ` + notify.action);
  },
  popInitialNotification: true,
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage);
  notificationHandle(remoteMessage);
  StoreNotification(remoteMessage);
  console.log(
    `message handled in the background ${JSON.stringify(remoteMessage)}`,
  );
});

AppRegistry.registerComponent(appName, () => Root);
