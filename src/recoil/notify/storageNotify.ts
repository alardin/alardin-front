import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { SetterOrUpdater } from 'recoil';
import { INotifyDataType } from '../../components/organisms/notify/NotifyList';

interface IStoreNotificationProps<T> {
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | any;
  storage: T;
  setStorage: SetterOrUpdater<T>;
}

const StoreNotification = ({
  remoteMessage,
  storage,
  setStorage,
}: IStoreNotificationProps<INotifyDataType[]>) => {
  console.log('function');
  console.log(remoteMessage);
  const storagingItem = (message: string) => {
    console.log('string message');
    console.log(message);
    //   const storagePath = 'notifyStorage';
    let notifyArr: any = [];
    console.log('parsed');
    const convertMessage = JSON.parse(message);
    console.log(convertMessage);

    if (storage) {
      notifyArr = [convertMessage, ...storage];
      setStorage(notifyArr);
    } else {
      setStorage([convertMessage]);
    }
    return notifyArr;
  };

  if (remoteMessage && Object.keys(remoteMessage).length !== 0) {
    const { type, message } = remoteMessage.data;
    let result;
    switch (type) {
      case 'MATE_ALARM':
        result = storagingItem(message);
        return result;
      case 'ROOM_ALARM':
        result = storagingItem(message);
        return result;
      case 'NOTICE_ALARM':
        result = storagingItem(message);
        return result;
      default:
        return;
    }
  }
};

export default StoreNotification;
