import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, selector } from 'recoil';

const defaultNotify = selector({
  key: 'defaultNotify',
  get: async () => {
    const notifyJson = await AsyncStorage.getItem('notifyStorage');
    if (notifyJson) {
      const notifyData = JSON.parse(notifyJson);
      return notifyData;
    }
    return [];
  },
});

const defaultMateNotify = selector({
  key: 'defaultMateNotify',
  get: async () => {
    const notifyJson = await AsyncStorage.getItem('defaultMateNotify');
    if (notifyJson) {
      const notifyData = JSON.parse(notifyJson);
      return notifyData;
    }
    return [];
  },
});

export const notifyList = atom({
  key: 'notifyList',
  default: defaultNotify,
});

export const mateNotifyList = atom({
  key: 'mateNotifyList',
  default: defaultMateNotify,
});

export const isNotify = atom({
  key: 'isNotify',
  default: false,
});
