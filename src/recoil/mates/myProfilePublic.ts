/* eslint-disable @typescript-eslint/no-unused-expressions */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';

export const myProfilePublic = atom<boolean>({
  key: 'myProfilePublic',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      AsyncStorage.getItem('myProfilePublic').then(savedValue =>
        savedValue !== null ? setSelf(JSON.parse(savedValue)) : false,
      );

      onSet((newValue, _, isReset) => {
        isReset
          ? AsyncStorage.removeItem('myProfilePublic')
          : AsyncStorage.setItem('myProfilePublic', JSON.stringify(newValue));
      });
    },
  ],
});
