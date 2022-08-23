import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { navigate, navigationRef } from '../navigation/RootNavigation';

// export interface NotificationType {
//   messageId: string;
//   data: { type: string; message: object };
//   notification: { body: string; title: string };
//   from: string;
// }

const notification = ({ data }: FirebaseMessagingTypes.RemoteMessage) => {
  if (data && Object.keys(data).length !== 0) {
    const { type, message } = data;
    switch (type) {
      case 'ALARM_START':
        console.log(`Notification: ${type}`);
        console.log(`Notification: ${message}`);
        const { id, alarmId, gameId, nickname, thumbnail_image_url, userType } =
          JSON.parse(message);
        if (navigationRef.current?.isReady()) {
          navigate({
            name: 'CallScreen',
            params: {
              id,
              thumbnail_image_url,
              alarmId,
              gameId,
              nickname,
              userType,
            },
          });
        }
        return;
      case 'MATE_ALARM':
        return;
      case 'NOTICE_ALARM':
        return;
      default:
        return;
    }
  }
};

export default notification;
