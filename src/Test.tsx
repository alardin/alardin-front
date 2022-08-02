import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import KakaoLogin from './components/atoms/buttons/KakaoLogin';
import WebScreen from './screen/WebScreen';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';

const Test = () => {
  const [token, setToken] = useState<string>('');
  const bringToken = async () => {
    const result = await messaging().getToken();
    console.log(result);
    setToken(result);
  };

  bringToken();

  return (
    <SafeAreaView>
      <Text style={{ padding: 4 }}>{Config.KAKAO_NATIVE_APP_REDIRECT}</Text>
      <Text>{token}</Text>
      <WebScreen />
      <KakaoLogin />
    </SafeAreaView>
  );
};

export default Test;
