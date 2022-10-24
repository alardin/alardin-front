/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useCallback, useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import StackNavigation from './navigation/stack/StackNavigation';
import { navigationRef } from './navigation/RootNavigation';

import CodePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import theme from './theme/theme';
import checkNotifyType from './utils/notification/checkNotifyType';
import { defaultNotify, isNotify } from './recoil/notify/notify';

import BackgroundFetch from 'react-native-background-fetch';
import alardinApi from './utils/alardinApi';
import { IAlarmInfoData } from './recoil/home/alarmList';
import {
  cleanOldAlarmItems,
  getAlarmList,
  syncAlarmList,
} from './utils/alarm/alarmStorage';
import { checkAlarmScheduler } from './utils/alarm/alarmScheduler';
import notificationHandle from './utils/notification/notificationHandle';
import { toastEnable } from './utils/Toast';
import NetInfo from '@react-native-community/netinfo';
import useInterceptor from './hooks/useInterceptor';
import StoreNotification from './recoil/notify/storageNotify';

import { LogBox } from 'react-native';
import _ from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import PushNotification, { Importance } from 'react-native-push-notification';

LogBox.ignoreLogs(['componentWillUpdate']);
LogBox.ignoreLogs(['new NativeEventEmitter']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('componentWillUpdate') <= -1) {
    _console.warn(message);
  }
};

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const requestCameraAndAudioPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const initialBackgroundStatus = async () => {
  await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
    },
    async taskId => {
      console.log('[BackgroundFetch] taskId: ', taskId);
      switch (taskId) {
        case 'com.transistorsoft.alarmUpdate':
          try {
            const response = await alardinApi.get('/users/joined-alarms');
            const joinedAlarms: IAlarmInfoData[] =
              response.data.data.joinedAlarms;
            if (joinedAlarms) {
              await syncAlarmList(joinedAlarms);
            }
          } catch (err) {
            console.log(`cannot connect to server, bring xstorage info`);
          }

          await cleanOldAlarmItems();
          const resultList = await getAlarmList();
          checkAlarmScheduler(resultList);
          break;
        default:
          console.log('Default fetch task');
      }
      BackgroundFetch.finish(taskId);
    },
    async taskId => {
      BackgroundFetch.finish(taskId);
    },
  );

  BackgroundFetch.scheduleTask({
    taskId: 'com.transistorsoft.alarmUpdate',
    delay: 15 * 60 * 1000, // <-- milliseconds
  });
};

PushNotification.createChannel(
  {
    channelId: 'alardin-alarm-notification',
    channelName: 'alardin',
    importance: Importance.HIGH,
    vibrate: true,
    playSound: true,
    soundName: 'test_rooster.wav',
  },
  created => console.log('channel created! ', created),
);

const App = () => {
  const scheme = useColorScheme();
  useInterceptor();

  const setIsNotify = useSetRecoilState(isNotify);
  const [storage, setStorage] = useRecoilState(defaultNotify);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: theme.color.gray_900,
      background: theme.color.gray_100,
    },
  };

  const handleMessage = useCallback(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(`message notification one`);
      console.log(remoteMessage);
      checkNotifyType(remoteMessage) && setIsNotify(true);
      notificationHandle(remoteMessage);
      StoreNotification({ remoteMessage, storage, setStorage });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(`message notification two`);
        if (remoteMessage) {
          console.log(remoteMessage);
          checkNotifyType(remoteMessage) && setIsNotify(true);
          notificationHandle(remoteMessage);
          StoreNotification({ remoteMessage, storage, setStorage });
        }
      });
  }, []);

  useEffect(() => {
    handleMessage();
  }, [handleMessage]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  useEffect(() => {
    requestUserPermission();
    requestCameraAndAudioPermission();
    initialBackgroundStatus();
  }, []);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        toastEnable({
          text: '네트워크가 정상적으로 작동되지 않아 기능이 제한될 수 있습니다.',
          duration: 'INFINITY',
        });
      } else {
        toastEnable({
          text: '네트워크 정상 연결 확인',
          duration: 'SHORT',
        });
      }
    });
    // Unsubscribe
    return () => {
      unsubscribeNetInfo();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(`message notification three`);
      console.log(remoteMessage);
      checkNotifyType(remoteMessage) && setIsNotify(true);
      notificationHandle(remoteMessage);
      StoreNotification({ remoteMessage, storage, setStorage });
    });
    return unsubscribe;
  });

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
          translucent={true}
        />
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: '최신 업데이트 필요',
    optionalUpdateMessage:
      '현재 사용하고 계신 버전보다 개선된 서비스를 제공하기 위해 업데이트를 하시는 걸 권장합니다.',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '아니요.',
  },
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
