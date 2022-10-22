import { atom } from 'recoil';

const centerVisible = atom<boolean>({
  key: 'centerVisible',
  default: false,
});

export default centerVisible;
