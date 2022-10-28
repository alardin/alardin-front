import { atom } from 'recoil';

export const mateRefresh = atom<number>({
  key: 'mateRefresh',
  default: 0,
});
