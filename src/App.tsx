/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useCallback, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import StackNavigation from './navigation/stack/StackNavigation';
import { navigationRef } from './navigation/RootNavigation';

import 'react-native-gesture-handler';
import theme from './theme/theme';
import notification from './utils/notifications';
import checkNotifyType from './utils/checkNotifyType';
import { isNotify } from './recoil/notify/notify';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.lightSlate,
  },
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

const App = () => {
  const setIsNotify = useSetRecoilState(isNotify);

  const handleMessage = useCallback(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      checkNotifyType(remoteMessage) && setIsNotify(true);
      notification(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          checkNotifyType(remoteMessage) && setIsNotify(true);
          notification(remoteMessage);
        }
      });
  }, []);

  useEffect(() => {
    handleMessage();
  }, [handleMessage]);

  useEffect(() => {
    requestUserPermission();
    requestCameraAndAudioPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      checkNotifyType(remoteMessage) && setIsNotify(true);
      notification(remoteMessage);
    });
    return unsubscribe;
  });

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
