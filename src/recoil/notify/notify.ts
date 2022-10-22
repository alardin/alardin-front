/* eslint-disable @typescript-eslint/no-unused-expressions */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, selector } from 'recoil';
import { IMateNotifyItemData } from '../../components/molecules/notify/MateNotifyItem';
import { INotifyDataType } from '../../components/organisms/notify/NotifyList';
import alardinApi from '../../utils/alardinApi';
import { mateRefresh } from '../mates/mateRefresh';

// const defaultNotify = selector({
//   key: 'defaultNotify',
//   get: async () => {
//     const notifyJson = await AsyncStorage.getItem('notifyStorage');
//     if (notifyJson) {
//       const notifyData = JSON.parse(notifyJson);
//       return notifyData;
//     }
//     return [];
//   },
// });

export const defaultNotify = atom<INotifyDataType[]>({
  key: 'defaultNotify',
  default: [],
  effects: [
    ({ setSelf, onSet, trigger }) => {
      const loadPersisted = async () => {
        const savedValue = await AsyncStorage.getItem('notifyStorage');

        if (savedValue != null) {
          setSelf(JSON.parse(savedValue));
        }
      };

      // Asynchronously set the persisted data
      if (trigger === 'get') {
        loadPersisted();
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? AsyncStorage.removeItem('notifyStorage')
          : AsyncStorage.setItem('notifyStorage', JSON.stringify(newValue));
      });
    },
  ],
});

export const defaultMateNotify = selector({
  key: 'defaultMateNotify',
  get: async ({ get }) => {
    get(mateRefresh);

    const response = await alardinApi.get('/mate/requests');
    console.log(response.data.data);
    return response.data.data;
  },
});

export const notifyList = atom({
  key: 'notifyList',
  default: defaultNotify,
});

export const mateNotifyList = atom<{
  requestISent: IMateNotifyItemData[];
  responseIReceived: IMateNotifyItemData[];
}>({
  key: 'mateNotifyList',
  default: defaultMateNotify,
});

export const isNotify = atom({
  key: 'isNotify',
  default: false,
});
