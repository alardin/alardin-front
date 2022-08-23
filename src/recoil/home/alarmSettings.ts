/* eslint-disable @typescript-eslint/naming-convention */

import { atom, DefaultValue, selector } from 'recoil';
import alardinApi from '../../utils/alardinApi';
import {
  convertTime,
  dateToTimeString,
} from '../../utils/home/convertDateTime';
import { pickerMetaData } from '../picker';

export interface ISettingData {
  [key: string]: any;
}

export interface ISettingState {
  type: string;
  data: ISettingData;
}

export const initialSetting = {
  time: dateToTimeString(new Date()),
  is_private: false,
  is_repeated: '0',
  name: '',
  Game_id: pickerMetaData[1].data[0].value,
  music_name: pickerMetaData[0].data[0].value,
  music_volume: 90,
  max_members: 2,
};

export const initialSettingLabel = {
  time: convertTime(dateToTimeString(new Date())),
  is_private: false,
  is_repeated: pickerMetaData[2].data[0].label,
  Game_id: pickerMetaData[1].data[0].label,
  music_name: pickerMetaData[0].data[0].label,
};

export const settingData = atom<ISettingData>({
  key: 'settingData',
  default: {
    time: dateToTimeString(new Date()),
    is_private: false,
    is_repeated: '0',
    name: '',
    Game_id: pickerMetaData[1].data[0].value,
    music_name: pickerMetaData[0].data[0].value,
    music_volume: 90,
    max_members: 2,
  },
});

export const settingLabel = atom<ISettingData>({
  key: 'settingLabel',
  default: {
    time: convertTime(dateToTimeString(new Date())),
    is_private: false,
    is_repeated: pickerMetaData[2].data[0].label,
    Game_id: pickerMetaData[1].data[0].label,
    music_name: pickerMetaData[0].data[0].label,
  },
});

export const apiSettingState = selector({
  key: 'apiSettingState',
  get: async ({ get }) => {
    const data = get(settingData);
    const label = get(settingLabel);

    const gameApiData = await alardinApi.get('/game', {
      params: { skip: 0, take: 100 },
    });

    return {
      data: { ...data, Game_id: gameApiData.data.data[0].id },
      label: { ...label, Game_id: gameApiData.data.data[0].name },
    };
  },
});
