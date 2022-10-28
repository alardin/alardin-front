import { atom } from 'recoil';

const modalVisible = atom<boolean>({
  key: 'modalVisible',
  default: false,
});

export default modalVisible;
