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

export default alardinApi;
