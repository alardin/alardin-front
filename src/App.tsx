/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import StackNavi from './navigation/stack/StackNavi';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const App = () => {
  requestUserPermission();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Alert.alert(`A new FCM message from ${JSON.stringify(remoteMessage)}`);
    });
    return unsubscribe;
  });

  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavi />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
