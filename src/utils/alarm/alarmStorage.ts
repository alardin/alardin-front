/* eslint-disable @typescript-eslint/no-unused-expressions */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NetInfoState } from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import { IAlarmInfoData } from '../../recoil/home/alarmList';
import alardinApi from '../alardinApi';

export interface IAlarmStorageProps {
  netInfo?: NetInfoState;
  newList?: IAlarmInfoData[];
  deleteItem?: IAlarmInfoData;
}

export const deleteAlarmItem = async (alarmId: number) => {
  const myProfile = await AsyncStorage.getItem('myProfile');
  try {
    const jsonList = await AsyncStorage.getItem('alarmList');
    if (jsonList !== null) {
      const parseAlarmList = JSON.parse(jsonList);
      const filterArr = parseAlarmList.filter((item: IAlarmInfoData) => {
        if (item.id === alarmId && myProfile) {
          const { id, nickname } = JSON.parse(myProfile);
          item.Members[0].id === id &&
            item.Members[0].nickname === nickname &&
            alardinApi.delete(`/alarm/${alarmId}`);
        }
        return item.id !== alarmId;
      });

      await AsyncStorage.setItem('alarmList', JSON.stringify(filterArr));
    }
  } catch (err) {
    console.log(`Error from deleteAlarmItem : ` + err);
  }
};

export const cleanOldAlarmItems = async () => {
  try {
    const jsonList = await AsyncStorage.getItem('alarmList');
    if (jsonList !== null) {
      const parseAlarmList = JSON.parse(jsonList);
      const currentDateTime = new Date(Date.now());

      const removedOldAlarmList = parseAlarmList.filter(
        (alarm: IAlarmInfoData) => {
          if (alarm.is_repeated !== '0') {
            return true;
          }

          const createdDateType = new Date(alarm.created_at);
          const createDate = createdDateType.toISOString().split('T')[0];
          let convertDate = new Date(`${createDate}T${alarm.time}:00`);
          if (Platform.OS === 'android') {
            convertDate.setMinutes(
              convertDate.getMinutes() + currentDateTime.getTimezoneOffset(),
            );
          }

          // createdDateType > convertDate &&
          //   convertDate.setDate(convertDate.getDate() + 1);

          // if (convertDate < currentDateTime) {
          //   deleteAlarmItem(alarm.id);
          //   return false;
          // }
          return true;
        },
      );

      await AsyncStorage.setItem(
        'alarmList',
        JSON.stringify(removedOldAlarmList),
      );
    }
  } catch (err) {
    console.log(`Error from cleanOldAlarmItems : ` + err);
  }
};

export const syncAlarmList = async (newList: IAlarmInfoData[]) => {
  try {
    await AsyncStorage.setItem('alarmList', JSON.stringify(newList));
  } catch (err) {
    console.log(`Error from syncAlarmList : ` + err);
  }
};

export const getAlarmList = async () => {
  try {
    const jsonList = await AsyncStorage.getItem('alarmList');
    if (jsonList !== null) {
      const parseAlarmList = JSON.parse(jsonList);
      return parseAlarmList;
    } else {
      return [];
    }
  } catch (err) {
    console.log(`Error from storageAlarmList : ` + err);
  }
};

export const addAlarmList = async (newItem: IAlarmInfoData) => {
  try {
    const oldList = await getAlarmList();
    const newList = [...oldList, { ...newItem }];
    await AsyncStorage.setItem('alarmList', JSON.stringify(newList));
  } catch (err) {
    console.log(`Error from addAlarmList : ` + err);
  }
};

export const clearAlarmList = async () => {
  try {
    await AsyncStorage.setItem('alarmList', JSON.stringify([]));
  } catch (err) {
    console.log(`Error from clearAlarmList : ` + err);
  }
};
