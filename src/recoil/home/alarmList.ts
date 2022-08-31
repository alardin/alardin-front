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
  music_name: string;
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

const apiAlarmList = selector({
  key: 'apiAlarmList',
  get: async () => {
    const response = await alardinApi.get('/users/joined-alarms');
    const joinedAlarms: IAlarmInfoData[] = response.data.data.joinedAlarms;
    return joinedAlarms;
  },
});

export const alarmListRefresh = atom<number>({
  key: 'alarmListRefresh',
  default: 0,
});

export const alarmList = atom<IAlarmInfoData[]>({
  key: 'alarmList',
  default: apiAlarmList,
});

export const nextAlarm = selector<IAlarmInfoData>({
  key: 'nextAlarm',
  get: async ({ get }) => {
    get(alarmListRefresh);
    const joinedAlarms = get(alarmList);

    if (joinedAlarms.length !== 0) {
      let nextResult: IAlarmInfoData = { ...joinedAlarms[0] };
      joinedAlarms.forEach(aData => {
        console.log(nextResult);
        const nextDate = Date.parse(nextResult.created_at);
        const aDate = Date.parse(aData.created_at);
        console.log(`nextDate: ${nextDate}, aDate: ${aDate}`);
        // if (nextDate === aDate) {
        //   const rTime = Date.parse(`Wed, 09 Aug 1995 ${nextResult.time}:00`);
        //   const aTime = Date.parse(`Wed, 09 Aug 1995 ${aData.time}:00`);
        //   if (rTime > aTime) nextResult = aData;
        // }
        if (nextDate > aDate) nextResult = aData;
      });
      console.log(`result : ${nextResult.created_at}`);
      return nextResult;
    }
    return {} as IAlarmInfoData;
  },
});

export const myAttendAlarmList = selector<IAlarmInfoData[]>({
  key: 'myAttendAlarmList',
  get: async ({ get }) => {
    get(alarmListRefresh);
    const joinedAlarms = get(alarmList);

    const convertData = joinedAlarms.map(data => ({
      ...data,
      is_repeated: convertRepeatDay(data.is_repeated),
      time: data.time ? convertTime(data.time) : data.time,
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
      };
    });
    return convertData;
  },
});
