/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */

import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { useRecoilState } from 'recoil';
import { token } from '../recoil/authorization';
import alardinApi from '../utils/alardinApi';
import { toastEnable } from '../utils/Toast';
import EncryptedStorage from 'react-native-encrypted-storage';

const useInterceptor = () => {
  // EncryptedStorage.clear();
  const [userToken, setUserToken] = useRecoilState(token);

  const requestInterceptor = alardinApi.interceptors.request.use(
    async config => {
      const accessTokenStorage = await EncryptedStorage.getItem(
        'appAccessToken',
      );
      if (config.headers && accessTokenStorage) {
        const { appAccessToken } = JSON.parse(accessTokenStorage);
        config.headers['Authorization'] = `Bearer ${appAccessToken}`;
        return config;
      }
    },
  );

  const responseInterceptor = alardinApi.interceptors.response.use(
    response => response,
    async error => {
      const { config } = error;
      console.log('error');
      console.log(JSON.stringify(error));
      if (error.response.status === 401) {
        toastEnable({
          text: '인증이 만료되어 재발급을 요청합니다',
          duration: 'SHORT',
        });
        const refreshTokenStorage = await EncryptedStorage.getItem(
          'appRefreshToken',
        );
        console.log('appRefreshToken');
        console.log(refreshTokenStorage);
        if (refreshTokenStorage) {
          const parseRefreshToken = JSON.parse(refreshTokenStorage);
          axios({
            method: 'GET',
            url: `${Config.ENDPOINT}/api/users/refresh`,
            headers: {
              'Content-Type': 'application/json',
              'Refresh-Token': parseRefreshToken.appRefreshToken,
            },
          })
            .then(async (res: any) => {
              console.log('bring new accesss token');
              const { appAccessToken, appRefreshToken } = res.data.data;
              setUserToken({ appAccessToken, appRefreshToken });
              await EncryptedStorage.setItem(
                'appAccessToken',
                JSON.stringify({ appAccessToken }),
              );
              console.log('new access token');
              console.log(appAccessToken);
              axios.defaults.headers.common.Authorization = `Bearer ${appAccessToken}`;
              config.headers.Authorization = `Bearer ${appAccessToken}`;
              console.log('ready for request');
              // return alardinApi.request(config);
            })
            .catch(() => {
              toastEnable({
                text: '인증을 재발급하지 못했습니다. 로그인을 다시 시도해보세요.',
                duration: 'SHORT',
              });
            });
        }
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      alardinApi.interceptors.request.eject(requestInterceptor);
      alardinApi.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

export default useInterceptor;
