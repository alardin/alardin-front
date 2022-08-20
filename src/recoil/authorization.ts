import { atom } from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface IAuthorization {
  appAccessToken: string;
  appRefreshToken: string;
}

const defaultToken = async () => {
  const appAccessJson = await EncryptedStorage.getItem('appAccessToken');
  const appRefreshJson = await EncryptedStorage.getItem('appRefreshToken');
  if (appAccessJson && appRefreshJson) {
    const access = JSON.parse(appAccessJson);
    const refresh = JSON.parse(appRefreshJson);
    return {
      appAccessToken: access.appAccessToken,
      appRefreshToken: refresh.appRefreshToken,
    } as IAuthorization;
  }
  return {} as IAuthorization;
};

export const token = atom({
  key: 'token',
  default: defaultToken(),
});
