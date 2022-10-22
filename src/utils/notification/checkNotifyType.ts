import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

const checkNotifyType = ({ data }: FirebaseMessagingTypes.RemoteMessage) => {
  if (data && Object.keys(data).length !== 0) {
    const { type } = data;
    if (
      type === 'MATE_ALARM' ||
      type === 'NOTICE_ALARM' ||
      type === 'ROOM_ALARM'
    ) {
      return true;
    }
  }
  return false;
};

export default checkNotifyType;
