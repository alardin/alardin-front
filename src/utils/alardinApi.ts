/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */

import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

const ENDPOINT = Config.ENDPOINT;
let checkRefresh = false;

const alardinApi = axios.create({
  baseURL: `${ENDPOINT}/api`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

alardinApi.interceptors.request.use(async config => {
  const tokenJson = await EncryptedStorage.getItem('appAccessToken');
  if (tokenJson && config.headers) {
    const token = JSON.parse(tokenJson);
    config.headers['Authorization'] = `Bearer ${token.appAccessToken}`;
    return config;
  }
});

alardinApi.interceptors.response.use(
  response => response,
  async error => {
    const { config } = error;
    const tokenJson = await EncryptedStorage.getItem('appRefreshToken');
    console.log(`response error code : ${error.response.status}`);
    if (tokenJson && error.response.status === 401 && checkRefresh === false) {
      const { appRefreshToken } = JSON.parse(tokenJson);
      const retryOriginalReq = () => {
        checkRefresh = true;
        console.log('load promise');
        axios({
          method: 'GET',
          url: `${Config.ENDPOINT}/api/users/refresh`,
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            refreshToken: appRefreshToken,
          },
        }).then(async res => {
          const { appAccessToken } = res.data.data;
          await EncryptedStorage.setItem(
            'appAccessToken',
            JSON.stringify({ appAccessToken }),
          );
          axios.defaults.headers.common.Authorization = `Bearer ${appAccessToken}`;
          config.headers.Authorization = `Bearer ${appAccessToken}`;
          checkRefresh = false;
        });
        return alardinApi(config);
      };
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default alardinApi;
