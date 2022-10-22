/* eslint-disable @typescript-eslint/naming-convention */

import { getAccessToken } from '@react-native-seoul/kakao-login';
import axios from 'axios';

const kakaoApi = axios.create({
  baseURL: 'https://kapi.kakao.com/v1/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

kakaoApi.interceptors.request.use(async config => {
  const kakaoToken = await getAccessToken();
  if (kakaoToken && config.headers) {
    config.headers.Authorization = `Bearer ${kakaoToken.accessToken}`;
    return config;
  }
});

export default kakaoApi;
