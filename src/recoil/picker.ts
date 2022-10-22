import { atom, selector } from 'recoil';
import { gameMetaData, pickerMetaData } from './home/alarmSettings';

export interface IPickerData {
  label: string;
  value: string;
}

export interface IPickerObject {
  type: string;
  data: IPickerData[];
}

export const pickerMode = atom<string>({
  key: 'pickerMode',
  default: '',
});

export const pickerClicked = atom<number>({
  key: 'pickerClicked',
  default: 0,
});

export const pickerList = selector<IPickerObject>({
  key: 'pickerList',
  get: async ({ get }) => {
    const mode = get(pickerMode);
    const gameData = get(gameMetaData);

    switch (mode) {
      case 'music_name':
        return pickerMetaData[0];
      case 'Game_id':
        return { type: 'Game_id', data: gameData };
      case 'is_repeated':
        return pickerMetaData[2];
      default:
        return { type: '', data: [] };
    }
  },
});
