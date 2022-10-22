import { atom } from 'recoil';

export const isTrashMode = atom<boolean>({
  key: 'isTrashMode',
  default: true,
});

export const trashDataList = atom<any[]>({
  key: 'trashDataList',
  default: [],
});
