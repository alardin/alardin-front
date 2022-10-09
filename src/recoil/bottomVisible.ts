import { atom } from 'recoil';

const bottomVisible = atom<boolean>({
  key: 'bottomVisible',
  default: false,
});

export default bottomVisible;
