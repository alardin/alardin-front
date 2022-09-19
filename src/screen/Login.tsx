/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-native/no-inline-styles */

import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import Box from '../components/atoms/box/Box';
import Button from '../components/atoms/button/Button';
import { Image, ImageBackground, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import Text from '../components/atoms/text/Text';
import Container from '../components/atoms/container/Container';
import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSetRecoilState } from 'recoil';
import { IMyProfile, myProfile, token } from '../recoil/authorization';
import alardinApi from '../utils/alardinApi';

const TopBox = styled(Box)`
  height: 60%;
`;

const BottomBox = styled(Box)`
  height: 40%;
`;

const Login = () => {
  const setAuthorization = useSetRecoilState(token);
  const setMyProfile = useSetRecoilState(myProfile);
  const handlePress = async () => {
    const { accessToken, refreshToken, scopes }: KakaoOAuthToken =
      await login();
    console.log(accessToken, scopes);
    const deviceToken = await messaging().getToken();
    console.log(`Device Token: ${deviceToken}`);

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
        .then(async res => {
          const { status, data } = res.data;
          if (status === 'SUCCESS') {
            setAuthorization(data);
            await EncryptedStorage.setItem('scopes', JSON.stringify(scopes));
            console.log(data);
            await EncryptedStorage.setItem(
              'appAccessToken',
              JSON.stringify({ appAccessToken: data.appAccessToken }),
            );
            await EncryptedStorage.setItem(
              'appRefreshToken',
              JSON.stringify({ appRefreshToken: data.appRefreshToken }),
            );
            alardinApi.get('/users').then(async (my: any) => {
              const profileData: IMyProfile = my.data.data;
              await EncryptedStorage.setItem(
                'myProfile',
                JSON.stringify(profileData),
              );
              setMyProfile(profileData);
            });
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
