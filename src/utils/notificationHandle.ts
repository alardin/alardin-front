import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { navigate, navigationRef } from '../navigation/RootNavigation';

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
      default:
        return;
    }
  }
};

export default notificationHandle;
