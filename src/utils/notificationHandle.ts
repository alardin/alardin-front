import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, navigationRef } from '../navigation/RootNavigation';

// export interface NotificationType {
//   messageId: string;
//   data: { type: string; message: object };
//   notification: { body: string; title: string };
//   from: string;
// }

const storeNotification = (type: 'default' | 'mate', message: string) => {
  const storagePath = type === 'mate' ? 'mateRequestStorage' : 'notifyStorage';
  let notifyArr: any = [];
  const convertMessage = JSON.parse(message);
  console.log(convertMessage);
  AsyncStorage.getItem(storagePath).then(value => {
    if (value) {
      const convertArr = JSON.parse(value);
      notifyArr = [...convertArr, convertMessage];
      AsyncStorage.setItem(storagePath, JSON.stringify(notifyArr));
    } else {
      AsyncStorage.setItem(storagePath, JSON.stringify([convertMessage]));
    }
    return notifyArr;
  });
};

const notificationHandle = ({ data }: FirebaseMessagingTypes.RemoteMessage) => {
  if (data && Object.keys(data).length !== 0) {
    // const { title, body } = notification;
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
        storeNotification('default', message);
        return;
      case 'ROOM_ALARM':
        storeNotification('default', message);
        return;
      case 'NOTICE_ALARM':
        storeNotification('default', message);
        return;
      default:
        return;
    }
  }
};

export default notificationHandle;
