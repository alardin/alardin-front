import { atom } from 'recoil';

export interface IAuthorization {
  appAccessToken: string;
  appRefreshToken: string;
}

const authorization = atom<IAuthorization>({
  key: 'authorization',
  default: {} as IAuthorization,
});

export default authorization;
