import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';

PushNotification.configure({
  onRegister: token => console.log('notifi token: ' + token),
  onNotification: notify => {
    console.log('notifyed : ' + notify);
    notify.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

PushNotification.createChannel(
  {
    channelId: 'alardin-channel-0',
    channelName: 'alardin',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log('channel created! ', created),
);
