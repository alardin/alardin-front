/* eslint-disable @typescript-eslint/naming-convention */

import { atom, selector } from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import Config from 'react-native-config';
import alardinApi from '../utils/alardinApi';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';

export interface IMyProfile {
  id: number;
  kakao_id: string;
  email: string;
  name: string;
  nickname: string;
  bio: string;
  profile_image_url: string;
  thumbnail_image_url: string;
  is_default_image: boolean;
  age_range: string;
  gender: string;
  is_admin: boolean;
  device_token: string;
  refresh_token: string;
  kakao_access_token: string;
  kakao_refresh_token: string;
  enroll_date: string;
  updated_at: string;
  deleted_at: any;
  Asset_id: number;
}

export interface IAuthorization {
  appAccessToken: string;
  appRefreshToken: string;
}

const defaultToken = selector({
  key: 'defaultToken',
  get: async () => {
    const appAccessJson = await EncryptedStorage.getItem('appAccessToken');
    const appRefreshJson = await EncryptedStorage.getItem('appRefreshToken');
    if (appAccessJson && appRefreshJson) {
      console.log('login found!');
      const access = JSON.parse(appAccessJson);
      const refresh = JSON.parse(appRefreshJson);
      return {
        appAccessToken: access.appAccessToken,
        appRefreshToken: refresh.appRefreshToken,
      } as IAuthorization;
    }
    return {} as IAuthorization;
  },
});

const defaultProfile = selector({
  key: 'defaultProfile',
  get: async () => {
    const profileJson = await EncryptedStorage.getItem('myProfile');
    if (profileJson) {
      const myProfile = JSON.parse(profileJson);
      return { ...myProfile };
    }
    return {} as IMyProfile;
  },
});

export const token = atom({
  key: 'token',
  default: defaultToken,
});

export const myProfile = atom({
  key: 'myProfile',
  default: defaultProfile,
});

export const renewalTokenByAgreement = selector<KakaoOAuthToken>({
  key: 'renewalTokenByAgreement',
  get: () => {
    return {} as KakaoOAuthToken;
  },
  set: async ({ set }, newToken) => {
    const { accessToken, refreshToken }: any = newToken;
    const deviceToken = await messaging().getToken();
    axios({
      method: 'POST',
      url: `${Config.ENDPOINT}/api/users/auth`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        accessToken,
        refreshToken,
        deviceToken,
      },
    }).then(res => {
      const { data } = res.data;
      set(token, { ...data });
      EncryptedStorage.setItem(
        'appAccessToken',
        JSON.stringify({ appAccessToken: data.appAccessToken }),
      );
      EncryptedStorage.setItem(
        'appRefreshToken',
        JSON.stringify({ appRefreshToken: data.appRefreshToken }),
      );
      alardinApi.get('/users').then((my: any) => {
        const profileData: IMyProfile = my.data.data;
        EncryptedStorage.setItem('myProfile', JSON.stringify(profileData));
        set(myProfile, profileData);
      });
    });
  },
});
