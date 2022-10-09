/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-native/no-inline-styles */

import {
  KakaoOAuthToken,
  login,
  unlink,
} from '@react-native-seoul/kakao-login';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import Box from '../components/atoms/box/Box';
import Button from '../components/atoms/button/Button';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
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
  justify-content: center;
`;

const LoginButton = styled.TouchableOpacity``;

const Login = () => {
  const setAuthorization = useSetRecoilState(token);
  const setMyProfile = useSetRecoilState(myProfile);
  const handlePress = async () => {
    const { accessToken, refreshToken, scopes }: KakaoOAuthToken =
      await login();
    console.log(accessToken, scopes);
    const deviceToken = await messaging().getToken();
    console.log(`Device Token: ${deviceToken}`);

    if (
      !scopes.includes('profile_image') ||
      !scopes.includes('account_email')
    ) {
      Alert.alert(
        '최소 동의 조건',
        '앱을 이용하기 위해서 최소 "프로필 사진", "이메일 항목"에 대해 동의해주셔야 합니다.',
      );
      await unlink();
      return;
    }

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
          <Text size="xl" options="semiBold">
            Alardin
          </Text>
        </TopBox>
        <BottomBox>
          <LoginButton onPress={handlePress}>
            <ImageBackground
              style={{ width: '100%', height: 56 }}
              source={require('../assets/images/kakao_login_large_wide.png')}
            />
          </LoginButton>
        </BottomBox>
      </Container>
    </SafeAreaView>
  );
};

export default Login;
