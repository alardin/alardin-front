import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, navigationRef } from '../navigation/RootNavigation';

// export interface NotificationType {
//   messageId: string;
//   data: { type: string; message: object };
//   notification: { body: string; title: string };
//   from: string;
// }

const storeNotification = (message: string) => {
  let notifyArr: any = [];
  const convertMessage = JSON.parse(message);
  console.log(convertMessage);
  AsyncStorage.getItem('notifyStorage').then(value => {
    if (value) {
      const convertArr = JSON.parse(value);
      notifyArr = [...convertArr, convertMessage];
      AsyncStorage.setItem('notifyStorage', JSON.stringify(notifyArr));
    } else {
      AsyncStorage.setItem('notifyStorage', JSON.stringify([convertMessage]));
    }
    return notifyArr;
  });
};

const notification = ({ data }: FirebaseMessagingTypes.RemoteMessage) => {
  if (data && Object.keys(data).length !== 0) {
    const { type, message } = data;
    switch (type) {
      case 'ALARM_START':
        const { id, alarmId, nickname, thumbnail_url, userType } =
          JSON.parse(message);
        if (navigationRef.current?.isReady()) {
          navigate({
            name: 'CallScreen',
            params: {
              id,
              alarmId,
              nickname,
              userType,
              thumbnail_image_url: thumbnail_url,
            },
          });
        } else {
          setTimeout(
            () =>
              navigate({
                name: 'CallScreen',
                params: {
                  id,
                  alarmId,
                  nickname,
                  userType,
                  thumbnail_image_url: thumbnail_url,
                },
              }),
            1000,
          );
        }
        return;
      case 'MATE_ALARM':
        return;
      case 'NOTICE_ALARM':
        storeNotification(message);
        return;
      default:
        return;
    }
  }
};

export default notification;
