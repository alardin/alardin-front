import { atom, selector } from 'recoil';
import alardinApi from '../../utils/alardinApi';
import {
  convertRepeatDay,
  convertTime,
} from '../../utils/home/convertDateTime';
import { IMembersDataType } from './members';

export interface IAlarmInfoData {
  id: number;
  time: string | undefined;
  is_repeated: string;
  is_private: boolean;
  music_volume: number;
  max_members: number;
  created_at: string;
  Game: {
    id: number;
    name: string;
    thumbnail_url: string;
  };
  Members: IMembersDataType[];
  name: string;
}

export const alarmListRefresh = atom<number>({
  key: 'alarmListRefresh',
  default: 0,
});

export const alarmList = atom<IAlarmInfoData[]>({
  key: 'alarmList',
  default: [],
});

export const nextAlarm = selector<IAlarmInfoData>({
  key: 'nextAlarm',
  get: async ({ get }) => {
    get(alarmListRefresh);
    const response = await alardinApi.get('/users/joined-alarms');
    const joinedAlarms: IAlarmInfoData[] = response.data.data.joinedAlarms;

    if (joinedAlarms.length !== 0) {
      let nextResult: IAlarmInfoData = { ...joinedAlarms[0] };
      joinedAlarms.forEach(aData => {
        const nextString = new Date(nextResult.created_at).toDateString();
        const aString = new Date(aData.created_at).toDateString();
        const nextDate = new Date(nextString);
        const aDate = new Date(aString);
        if (nextDate === aDate) {
          const rTime = Date.parse(`Wed, 09 Aug 1995 ${nextResult.time}:00`);
          const aTime = Date.parse(`Wed, 09 Aug 1995 ${aData.time}:00`);
          if (rTime > aTime) nextResult = aData;
        }
        if (nextDate > aDate) nextResult = aData;
      });
      return nextResult;
    }
    return {} as IAlarmInfoData;
  },
});

export const myAttendAlarmList = selector<IAlarmInfoData[]>({
  key: 'myAttendAlarmList',
  get: async ({ get }) => {
    get(alarmListRefresh);
    const response = await alardinApi.get('/users/joined-alarms');
    const joinedAlarms: IAlarmInfoData[] = response.data.data.joinedAlarms;

    const convertData = joinedAlarms.map(data => ({
      ...data,
      is_repeated: convertRepeatDay(data.is_repeated),
      time: data.time ? convertTime(data.time) : data.time,
      Members: data.Members.map(member => ({
        ...member,
        thumbnail_image_url: `https://${
          member.thumbnail_image_url.split('//')[1]
        }`,
      })),
    }));
    return convertData;
  },
});

export const matesAttendAlarmList = selector<IAlarmInfoData[]>({
  key: 'matesAttendAlarmList',
  get: async ({ get }) => {
    get(alarmListRefresh);
    const response = await alardinApi.get('/mate/alarms');
    const matesAlarmList: IAlarmInfoData[] = response.data.data;

    const convertData = matesAlarmList.map(data => {
      const time = data.time ? convertTime(data.time) : data.time;
      return {
        ...data,
        is_repeated: convertRepeatDay(data.is_repeated),
        time,
        Members: data.Members.map(member => ({
          ...member,
          thumbnail_image_url: `https://${
            member.thumbnail_image_url.split('//')[1]
          }`,
        })),
      };
    });
    return convertData;
  },
});
