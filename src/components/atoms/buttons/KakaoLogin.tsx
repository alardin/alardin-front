import React from 'react';
import { Button } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';

const KakaoLogin = () => {
  const handlePress = async () => {
    console.log('press');
    const result = await login();
    console.log(result);
  };
  return <Button title="Kakao Login" onPress={handlePress} />;
};

export default KakaoLogin;
