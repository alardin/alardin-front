import { atom } from 'recoil';
import {
  convertTime,
  dateToTimeString,
} from '../../utils/home/convertDateTime';
import { pickerMetaData } from '../picker';

export interface ISettingData {
  [key: string]: any;
}

export const settingData = atom<ISettingData>({
  key: 'settingData',
  default: {
    time: dateToTimeString(new Date()),
    is_private: false,
    is_repeated: '0',
    title: '',
    game: pickerMetaData[1].data[0].value,
    music: pickerMetaData[0].data[0].value,
  },
});

export const settingLabel = atom<ISettingData>({
  key: 'settingLabel',
  default: {
    time: convertTime(dateToTimeString(new Date())),
    is_private: false,
    is_repeated: pickerMetaData[2].data[0].label,
    game: pickerMetaData[1].data[0].label,
    music: pickerMetaData[0].data[0].label,
  },
});
