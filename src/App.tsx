/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useCallback, useEffect } from 'react';
import { PermissionsAndroid, Platform, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import StackNavigation from './navigation/stack/StackNavigation';
import { navigationRef } from './navigation/RootNavigation';

import CodePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import theme from './theme/theme';
import checkNotifyType from './utils/checkNotifyType';
import { isNotify } from './recoil/notify/notify';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import BackgroundFetch from 'react-native-background-fetch';
import alardinApi from './utils/alardinApi';
import { IAlarmInfoData } from './recoil/home/alarmList';
import {
  cleanOldAlarmItems,
  getAlarmList,
  syncAlarmList,
} from './utils/alarm/alarmStorage';
import { checkAlarmScheduler } from './utils/alarm/alarmScheduler';
import notificationHandle from './utils/notificationHandle';
import { toastEnable } from './utils/Toast';
import NetInfo from '@react-native-community/netinfo';
import useInterceptor from './hooks/useInterceptor';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.gray_100,
  },
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

const App = () => {
  useInterceptor();
  const setIsNotify = useSetRecoilState(isNotify);

  const handleMessage = useCallback(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(`message notification one`);
      checkNotifyType(remoteMessage) && setIsNotify(true);
      notificationHandle(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(`message notification two`);
        if (remoteMessage) {
          checkNotifyType(remoteMessage) && setIsNotify(true);
          notificationHandle(remoteMessage);
        }
      });
  }, []);

  useEffect(() => {
    handleMessage();
  }, [handleMessage]);

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
    PushNotificationIOS.addEventListener('localNotification', () => {
      console.log(`local test`);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(`message notification three`);
      console.log(remoteMessage);
      checkNotifyType(remoteMessage) && setIsNotify(true);
      notificationHandle(remoteMessage);
    });
    return unsubscribe;
  });

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        <StatusBar animated={true} barStyle="dark-content" />
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: '...',
    optionalUpdateMessage: '...',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '아니요.',
  },
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
