import { atom } from 'recoil';

const checkScopes = atom<string[]>({
  key: 'checkScopes',
  default: [],
});

export default checkScopes;
