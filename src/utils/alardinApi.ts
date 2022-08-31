/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

const ENDPOINT = Config.ENDPOINT;

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
    if (tokenJson) {
      const { appRefreshToken } = JSON.parse(tokenJson);
      console.log('need refresh token');
      console.log(appRefreshToken);
      const retryOriginalReq = new Promise(resolve => {
        axios({
          method: 'GET',
          url: `${Config.ENDPOINT}/api/users/refresh`,
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            refreshToken: appRefreshToken,
          },
        }).then(res => {
          console.log(res);
          const { appAccessToken } = res.data.data;
          EncryptedStorage.setItem(
            'appAccessToken',
            JSON.stringify({ appAccessToken }),
          );
          axios.defaults.headers.common.Authorization = `Bearer ${appAccessToken}`;
          config.headers.Authorization = `Bearer ${appAccessToken}`;
        });
        return resolve(alardinApi.request(config));
      });
      return retryOriginalReq;
    }
    return Promise.reject(error);
  },
);

export default alardinApi;
