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

export default alardinApi;
