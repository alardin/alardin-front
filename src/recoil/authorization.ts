import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';
import { atom } from 'recoil';

export interface IAuthorization extends KakaoOAuthToken {
  deviceToken: string;
}

const authorization = atom<IAuthorization>({
  key: 'authorization',
  default: {} as IAuthorization,
});

export default authorization;
