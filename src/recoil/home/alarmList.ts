/* eslint-disable @typescript-eslint/naming-convention */

import { atom, selector } from 'recoil';
import alardinApi from '../../utils/alardinApi';
import { checkAlarmScheduler } from '../../utils/alarm/alarmScheduler';
import { getAlarmList, syncAlarmList } from '../../utils/alarm/alarmStorage';
import { convertRepeatDay } from '../../utils/home/convertDateTime';
import { token } from '../authorization';
import { IMembersDataType } from './members';

export interface IAlarmInfoData {
  id: number;
  time: string | undefined;
  is_repeated: string;
  is_private: boolean;
  music_name: string;
  music_volume: number;
  max_member: number;
  created_at: string;
  Game: {
    id: number;
    name: string;
    thumbnail_url: string;
  };
  Host: {
    id: number;
    nickname: string;
    thumbnail_image_url: string;
  };
  Host_id: number;
  Members: IMembersDataType[];
  name: string;
}

export const alarmListRefresh = atom<number>({
  key: 'alarmListRefresh',
  default: 0,
});

const apiAlarmList = selector({
  key: 'apiAlarmList',
  get: async ({ get }) => {
    get(token);
    get(alarmListRefresh);

    try {
      const response = await alardinApi.get('/users/joined-alarms');
      const {
        joinedAlarms,
      }: { joinedAlarms: IAlarmInfoData[]; hostedAlarms: IAlarmInfoData[] } =
        response.data.data;

      if (joinedAlarms) {
        await syncAlarmList(joinedAlarms);
      }

      const resultList = await getAlarmList();
      checkAlarmScheduler(resultList);
      return resultList;
    } catch (err) {
      console.log(`cannot connect to server, bring xstorage info`);
    }
  },
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
        const nextDate = Date.parse(nextResult.created_at);
        const aDate = Date.parse(aData.created_at);
        const nextDateString = nextResult.created_at.split('T')[0];
        const aDateString = aData.created_at.split('T')[0];

        if (nextDateString === aDateString) {
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
    const joinedAlarms = get(alarmList);

    const convertData = joinedAlarms.map(data => ({
      ...data,
      is_repeated: convertRepeatDay(data.is_repeated),
    }));
    return convertData;
  },
});

export const matesAttendAlarmList = selector<IAlarmInfoData[]>({
  key: 'matesAttendAlarmList',
  get: async ({ get }) => {
    get(alarmListRefresh);
    const myAlarmList = get(myAttendAlarmList);

    const response = await alardinApi.get('/mate/alarms');
    const matesAlarmList: IAlarmInfoData[] = response.data.data;

    console.log('mates alarms');
    // console.log(matesAlarmList);

    const removeJoinedAlarm = matesAlarmList.filter(
      mateAlarm => !myAlarmList.some(myAlarm => mateAlarm.id === myAlarm.id),
    );
    const convertData = removeJoinedAlarm.map(data => {
      return {
        ...data,
        is_repeated: convertRepeatDay(data.is_repeated),
      };
    });
    return convertData;
  },
});
