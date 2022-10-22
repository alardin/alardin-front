import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import notificationHandle from './notificationHandle';
import { v4 as uuid } from 'uuid';

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

PushNotification.createChannel(
  {
    channelId: 'alardin-alarm-notification',
    channelName: 'alardin-alarm',
    importance: Importance.HIGH,
    vibrate: true,
    playSound: true,
  },
  created => console.log('channel created! ', created),
);
