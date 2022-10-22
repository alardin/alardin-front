import EncryptedStorage from 'react-native-encrypted-storage';
import PushNotification from 'react-native-push-notification';
import { IAlarmInfoData } from '../../recoil/home/alarmList';
import { alarmItemtoDate } from '../home/convertDateTime';

export interface IAlarmNotificationProps {
  alarmId: number;
  date: Date;
  soundName: string;
  gameId: number;
}

export const getAlarmScheduler = () => {
  PushNotification.getScheduledLocalNotifications(notifications => {
    console.log(notifications);
  });
};

export const addAlarmScheduler = async ({
  soundName,
  date,
  alarmId,
  gameId,
}: IAlarmNotificationProps) => {
  const diffSecond = Math.floor(
    (date.getTime() - new Date(Date.now()).getTime()) / 1000,
  );

  const jsonProfile = await EncryptedStorage.getItem('myProfile');
  const { id } = jsonProfile ? JSON.parse(jsonProfile) : { id: 0 };

  const platformDate = Date.now() + diffSecond * 1000;

  for (let i = 0; i < 14; i++) {
    PushNotification.localNotificationSchedule({
      channelId: 'alardin-alarm-notification',
      id: String(alarmId * 1000 + i),
      title: 'Alardin 알람',
      message: '지금 일어나세요!!!!',
      date: new Date(platformDate + i * 5 * 1000),
      playSound: true,
      soundName,
      vibration: 1000,
      vibrate: true,
      allowWhileIdle: true,
      userInfo: {
        type: 'ALARM_START',
        message: JSON.stringify({
          id,
          alarmId,
          thumbnail_image_url: '',
          nickname: '',
          userType: '',
          gameId,
        }),
      },
    });
  }
};

export const deleteAlarmScheduler = (id: number) => {
  PushNotification.cancelLocalNotification(String(id));
};

export const checkAlarmScheduler = (alarmList: IAlarmInfoData[]) => {
  PushNotification.getScheduledLocalNotifications(notifications => {
    const checkDate = alarmList.map(alarm => {
      const { is_repeated, time } = alarm;
      return alarmItemtoDate({ is_repeated, time: String(time) });
    });

    const sortedArr = checkDate
      .sort((a, b) => Number(a) - Number(b))
      .filter(alarm => new Date(Date.now()) < alarm)
      .map(date => {
        const num = checkDate.indexOf(date);
        return alarmList[num];
      })
      .filter((_, index) => index < 3);

    const addList = sortedArr.filter(
      alarm =>
        !notifications.some(notification => {
          const notifyId = Math.floor(Number(notification.id) / 1000);
          return (
            alarm.id <= notifyId && Number(notification.id) < alarm.id + 14
          );
        }),
    );

    const deleteList = notifications.filter(
      notification =>
        !sortedArr.some(alarm => {
          const notifyId = Math.floor(Number(notification.id) / 1000);
          return alarm.id <= notifyId && notifyId < alarm.id + 14;
        }),
    );

    addList.map(alarm => {
      addAlarmScheduler({
        alarmId: alarm.id,
        date: alarmItemtoDate({
          is_repeated: alarm.is_repeated,
          time: String(alarm.time),
        }),
        soundName: 'test_rooster.wav',
        gameId: alarm.Game.id,
      });
    });

    deleteList.map(alarm => {
      deleteAlarmScheduler(Number(alarm.id));
    });
  });
};

export const retouchAlarmScheduler = ({
  soundName,
  date,
}: IAlarmNotificationProps) => {
  // PushNotification.cancelLocalNotification(String(id));
  PushNotification.localNotificationSchedule({
    channelId: 'alardin-channel-id',
    title: 'Alardin 알람',
    message: '지금 일어나세요!!!!',
    date,
    playSound: true,
    soundName,
    repeatType: 'minute',
    repeatTime: 5 * 1000,
  });
};

export const clearAlarmScheduler = () => {
  PushNotification.cancelAllLocalNotifications();
};
