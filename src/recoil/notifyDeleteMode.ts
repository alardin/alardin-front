import { atom } from 'recoil';

export const notifyDeleteMode = atom<boolean>({
  key: 'notifyDeleteMode',
  default: false,
});
