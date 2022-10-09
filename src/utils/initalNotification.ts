import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import notificationHandle from './notificationHandle';

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
    channelId: 'alardin-alarm-0',
    channelName: 'alardin',
    importance: Importance.HIGH,
    vibrate: true,
    playSound: true,
  },
  created => console.log('channel created! ', created),
);
