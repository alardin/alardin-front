import React, { useEffect } from 'react';
import { Alert, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import StackNavigation from './navigation/stack/StackNavigation';

import 'react-native-gesture-handler';
import theme from './theme/theme';

// Ignore some warnings when debugging
LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs([
  'Require cycle: node_modules/core-js/internals/microtask.js -> node_modules/core-js/internals/microtask.js',
]);
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert(`A new FCM message from ${JSON.stringify(remoteMessage)}`);
    });
    return unsubscribe;
  });

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavigationContainer theme={navTheme}>
          <StackNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
