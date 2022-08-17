import {
  KakaoOAuthToken,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import Box from '../components/atoms/box/Box';
import Button from '../components/atoms/button/Button';
import { Image, ImageBackground, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import Text from '../components/atoms/text/Text';
import Container from '../components/atoms/container/Container';
import { useSetRecoilState } from 'recoil';
import authorization from '../recoil/authorization';
import axios from 'axios';
import Config from 'react-native-config';

const TopBox = styled(Box)`
  height: 60%;
`;

const BottomBox = styled(Box)`
  height: 40%;
`;

const Login = () => {
  const setAuthorization = useSetRecoilState(authorization);
  const handlePress = async () => {
    const { accessToken, refreshToken }: KakaoOAuthToken =
      await loginWithKakaoAccount();
    const deviceToken = await messaging().getToken();

    if (accessToken && refreshToken && deviceToken) {
      axios({
        method: 'POST',
        url: `${Config.ENDPOINT}/api/users/auth`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          accessToken,
          refreshToken,
          deviceToken,
        },
      })
        .then(res => {
          const { status, data } = res.data;
          if (status === 'SUCCESS') {
            console.log(data);
            setAuthorization(data);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <TopBox center>
          <Image
            style={{ width: 120, height: 120, marginBottom: 20 }}
            source={require('../assets/images/clock.png')}
          />
          <Text textType="title" options="semiBold">
            Alardin
          </Text>
        </TopBox>
        <BottomBox center>
          <Button width="90%" height="48px" center onPress={handlePress}>
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              source={require('../assets/images/kakao_login_large_wide.png')}
            />
          </Button>
        </BottomBox>
      </Container>
    </SafeAreaView>
  );
};

export default Login;
