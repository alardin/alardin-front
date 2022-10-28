import { atom } from 'recoil';

const checkNetwork = atom({
  key: 'checkNetwork',
  default: false,
});

export default checkNetwork;
