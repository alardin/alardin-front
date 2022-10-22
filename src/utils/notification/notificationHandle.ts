import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { navigate, navigationRef } from '../../navigation/RootNavigation';

const notificationHandle = ({ data }: FirebaseMessagingTypes.RemoteMessage) => {
  if (data && Object.keys(data).length !== 0) {
    const { type, message } = data;
    switch (type) {
      case 'ALARM_START':
        const { id, alarmId, gameId } = JSON.parse(message);

        if (navigationRef.current?.isReady()) {
          navigate({
            name: 'CallScreen',
            params: {
              id,
              alarmId,
              gameId,
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
                  gameId,
                },
              }),
            2000,
          );
        }
        return;
      default:
        return;
    }
  }
};

export default notificationHandle;
