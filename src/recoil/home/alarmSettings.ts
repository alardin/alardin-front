/* eslint-disable @typescript-eslint/naming-convention */

import { atom, selector } from 'recoil';
import alardinApi from '../../utils/alardinApi';
import {
  convertTime,
  dateToTimeString,
} from '../../utils/home/convertDateTime';

export interface IGameMetaType {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  thumbnail_url: string;
  rating: number;
  min_player: number;
  max_player: number;
  keyword_count: number;
}

export const pickerMetaData = [
  {
    type: 'music_name',
    data: [{ label: '닭 울음소리', value: 'rooster' }],
  },
  {
    type: 'Game_id',
    data: [{ label: '선택하세요', value: 'default', max_player: 2 }],
  },
  {
    type: 'is_repeated',
    data: [
      { label: '아니요', value: '0' },
      { label: '예', value: '' },
    ],
  },
];

export interface ISettingData {
  [key: string]: any;
}

export interface ISettingState {
  type: string;
  data: ISettingData;
}

export const initialRecoilSetting = {
  time: '12:00',
  is_private: false,
  is_repeated: '0',
  name: '',
  music_volume: 90,
  max_member: 2,
  expired_at: dateToTimeString(new Date()),
};

export const initialSetting = {
  time: dateToTimeString(new Date()),
  is_private: false,
  is_repeated: '0',
  name: '',
  Game_id: pickerMetaData[2].data[0].value,
  music_name: pickerMetaData[0].data[0].value,
  music_volume: 90,
  max_member: 2,
};

export const apiGameMetaData = selector({
  key: 'apiGameMetaData',
  get: async () => {
    // const response = await alardinApi.get('/game', {
    //   params: { skip: 0, take: 100 },
    // });
    try {
      console.log('run state');
      const response = await alardinApi.get('/assets/games');
      const gameDataList: IGameMetaType[] = response.data.data;
      console.log(response.data.data);
      const gameData = gameDataList.map(
        ({ name, id, max_player }: IGameMetaType) => ({
          label: name,
          value: String(id),
          max_player,
        }),
      );
      return gameData;
    } catch (err) {
      return [{ label: '자동(오프라인 모드)', value: '0', max_player: 1 }];
    }
  },
});

// export const gameMetaData = atom({
//   key: 'gameMetaData',
//   default: apiGameMetaData,
// });

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
    max_member: pickerMetaData[1].data[0].max_player,
    expired_at: '',
  },
});

export const settingLabel = atom<ISettingData>({
  key: 'settingLabel',
  default: {
    time: String(convertTime(dateToTimeString(new Date()))),
    is_private: false,
    is_repeated: pickerMetaData[2].data[0].label,
    Game_id: pickerMetaData[1].data[0].label,
    music_name: pickerMetaData[0].data[0].label,
  },
});
